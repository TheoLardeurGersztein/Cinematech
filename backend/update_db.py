# This script is used for inserting movies from a file
# in the django database without the need of calling the APIs
import json
import os
import re
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from tmdb_genres_API import get_movie_genres_from_tmdb, get_series_genres_from_tmdb
from utilsUpdateDB import get_info_movie_from_file_name, clean_up_file_path, get_info_episode_from_file_name

from media_management.tmdb_series_API import get_series_id_from_title, get_series_from_tmdb_id, search_series
from media_management.models import Movie, Episode, Series, MovieGenre, SeriesGenre
from media_management.tmdb_movies_API import search_movies


def updateMovies(directory):

    all_movie_file_names = os.listdir(directory)
    movie_file_names = [file for file in all_movie_file_names if not file.startswith('.')]

    no_release_year = []
    not_fount = []
    unsure = []
    already_exists = []
    added = []
    bugged = []

    for file_name in movie_file_names:
        try:
            info = json.loads(get_info_movie_from_file_name(directory, file_name))
        except:
            bugged.append(file_name)
            continue
        title = info['title']
        release_year = info['release_year']
        file_path = info['file_path']
        duration = info['duration']

        if not title:
            not_fount.append(file_name)
            continue
        if not release_year:
            no_release_year.append(file_name)

        possible_movies = search_movies(title, release_year)
        if len(possible_movies) == 0:
            not_fount.append(title)
            continue

        first_possible_movie = possible_movies[0]
        if not Movie.objects.filter(file_path=file_path).exists():
            genres = first_possible_movie['genres']
            first_possible_movie.pop("genres")
            entry = Movie(
                **first_possible_movie,
                file_path=file_path,
                duration=duration
                )
            entry.save()
            entry.genres.set(genres)
            added.append(title)
        else:
            already_exists.append(title)


    print("No release year : ", no_release_year)
    print("Not found : ", not_fount)
    print("Unsure : ", unsure)
    print("Already exists: ", already_exists)
    print("Added : ", added)
    print("Bugged : ", bugged)

def updateSeries(directory):

    all_series_file_names = os.listdir(directory)
    movie_series_names = [file for file in all_series_file_names if not file.startswith('.')]
    series_not_fount = []
    episodes_not_fount = []
    unsure = []
    already_exists = []
    added = []
    bugged = []

    for series in movie_series_names:

        title_to_search = clean_up_file_path(series)
        possible_series = search_series(title_to_search)
        series_id = None

        if len(possible_series) != 1:
            unsure.append(series)
        if len(possible_series) == 0:
            series_not_fount.append(series)
            continue

        title = possible_series[0]['title']
        if not Series.objects.filter(title=title).exists():
            tmdb_series_id = get_series_id_from_title(title)
            series_data = get_series_from_tmdb_id(tmdb_series_id)
            genres = series_data['genres_ids']
            series_data.pop("genres_ids")
            series_instance = Series.objects.create(**series_data)
            series_instance.genres.set(genres)
            series_id = series_instance.id
        else:
            series_instance = Series.objects.get(title=title)
            series_id = series_instance.id


        for root, _, files in os.walk(os.path.join(directory, series)):
            for file in files:
                if file.startswith('.'):
                    continue
                try:
                    info = json.loads(get_info_episode_from_file_name(root, file))
                except:
                    bugged.append(file)
                    continue
                file_path = os.path.join(root, file).removeprefix(directory).replace("\\", "/")
                season_number = info['season_number']
                episode_number = info['episode_number']
                duration = info['duration']

                if not Episode.objects.filter(season_number=season_number, episode_number=episode_number,
                                          series=series_id).exists():
                    if series_id and season_number and episode_number:
                        entry = Episode(
                            season_number=season_number,
                            episode_number=episode_number,
                            file_path=file_path,
                            duration=duration,
                            series_id=series_id
                        )
                        entry.save()
                        added.append(f"{title} - S{season_number}E{episode_number}")
                    else:
                        episodes_not_fount.append(file)
                else:
                    already_exists.append(f"{title} - S{season_number}E{episode_number}")


    print("Series not found : ", series_not_fount)
    print("Unsure series : ", unsure)
    print("Episodes not found : ", episodes_not_fount)
    print("Already exists : ", already_exists)
    print("Added : ", added)
    print("Bugged : ", bugged )

    words_to_remove = [
        "Silence", "ESubs", "Subtitles",
        "English", "Spanish", "French",
        "Bitrate", "Quality", "Encoding",
        "Complete", "Collection", "Boxset",
        "Extended", "Uncut", "Directors Cut",
        "Special Edition", "Limited Edition",
        "HDR", "Dolby Vision", "Atmos", "IMAX",
        "[0-9]+bit", 
        "Extended Cut", "Uncensored",
        "Remastered", "Restoration",
        "WebRip", "Web-DL",
        "REPACK", "PROPER",
        "NTSC", "PAL", "SECAM",
        "Bonus", "Extras", "Deleted Scenes",
        "Behind the Scenes", "Making Of",
        "Interviews", "Commentary",
        "Digital Download",
        "Limited Series", "Mini Series",
        "Serialized", "Anthology",
        "Prequel", "Sequel", "Spin-off",
        "Adaptation", "Based on",
        "Award Winning", "Critically Acclaimed",
        "Collector's Edition", "Anniversary Edition",
        "Criterion Collection", "Arrow Video",
        "International", "Global",
        "Region", "Region Free",
        "Unrated", "Not Rated",
        "Parental Advisory", "Mature Content",
        "Limited Time Offer", "Sale",
        "Price Drop", "Discounted",
        "Instant Access", "Stream Now",
        "Exclusive", "Only on",
        "Limited Stock", "Out of Stock",
        "New Release", "Coming Soon",
        "Release Date", "Release Year",
        "Box Office", "Gross Revenue",
        "Film Festival", "Independent Film",
        "Direct-to-Video",
        "Theatrical Release",
        "Limited Theatrical Run",
        "In Theaters Now"
    ]

    patterns_to_remove = [
        r'\b\d{1,2}bit\b',  # Remove 10bit, 8bit
        r'\b\d{1,2}\.\d{1,2}\b',  # Remove 7.1, 5.1
    ]

def updateMovieGenres():
    data = get_movie_genres_from_tmdb()
    for genre in data['genres']:
        if not MovieGenre.objects.filter(name=genre['name']).exists():
            entry = MovieGenre(
                name=genre['name'],
                id=genre['id']
            )
            entry.save()

def updateSeriesGenres():
    data = get_series_genres_from_tmdb()
    for genre in data['genres']:
        if not SeriesGenre.objects.filter(name=genre['name']).exists():
            entry = SeriesGenre(
                name=genre['name'],
                id=genre['id']
            )
            entry.save()



if __name__ == '__main__':

    movie_directory = "D:\Movies"
    serie_directory = "D:\Series\\"

    updateMovieGenres()
    updateSeriesGenres()

    updateMovies(movie_directory)
    updateSeries(serie_directory)

    





