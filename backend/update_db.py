# This script is used for inserting movies from a file
# in the django database without the need of calling the APIs

import os
import re
import django

from django.shortcuts import get_object_or_404

from media_management.tmdb_series_API import get_series_id_from_title, get_episode_from_tmdb, get_series_from_tmdb_id

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from media_management.models import Movie, Episode, Series
from media_management.tmdb_movies_API import search_movies


def updateMovies(directory):

    movie_regex = r'^(.*?)(\d{4})'
    #To not count files starting with .
    point_regex = r'^\..*'


    movie_files = os.listdir(directory)
    movies = []
    unsure = []
    not_fount = []
    mp4_not_found = []
    for file in movie_files:
        movie_match = re.search(movie_regex, file)
        point_match = re.search(point_regex, file)
        if point_match:
            continue
        if movie_match:
            movie_title = movie_match.group(1)
            release_year = movie_match.group(2)
            if not release_year in ['1080', '2048', '4098', '8192'] :
                movie_title_without_points = movie_title.replace('.', ' ')
                files_in_fodler = os.listdir(os.path.join(directory, file) )
                for file_in_folder in files_in_fodler :
                    if file_in_folder.endswith('.mp4'):
                        file_path = file + '/' +  file_in_folder
                        movies.append((file_path, movie_title_without_points, release_year))
            else:
                not_fount.append(file)
        else:
            not_fount.append(file)


    #movies = [('Fantastic Mr Fox (2009) [1080p]/Fantastic.Mr.Fox.2009.1080p.BrRip.x264.YIFY.mp4', 'Fantastic Mr Fox', '2009')]

    for movie in movies:
        possible_movies = []
        for possible_movie in search_movies(movie[1]):
            if possible_movie['release_date'][:4:] == movie[2]:
                possible_movies.append(possible_movie)
        if len(possible_movies) != 1:
            unsure.append(movie)
        if not Movie.objects.filter(title__iexact=movie[1]).exists():
            entry = Movie(
                **possible_movies[0],
                file_path=movie[0])
            entry.save()
        else:
            print(movie[1], "already exists")

    print("Unsure : ", [t[0] for t in unsure])
    print("Not found : ", not_fount)



def updateSeries(directory):

    regex = (r'S(\d+)E(\d+)')

    words_to_remove = [
        "Season",
        "S[0-9]+",  # Match season numbers like S01, S02, etc.
        "Episode",
        "E[0-9]+",  # Match episode numbers like E01, E02, etc.
        "1080p", "720p", "4K",
        "BluRay", "DVD", "HD", "UHD", "DVDRip",
        "HEVC", "x265", "x264",
        "AAC", "AC3", "DTS", "Dolby",
        "H264", "BONE", "DD5",
        "[0-9]\.[0-9]",  # Match version numbers like 5.1, 7.1, etc.
        "Silence", "ESubs", "Subtitles",
        "English", "Spanish", "French",
        "Bitrate", "Quality", "Encoding",
        "Complete", "Collection", "Boxset",
        "Extended", "Uncut", "Directors Cut",
        "Special Edition", "Limited Edition",
        "HDR", "Dolby Vision", "Atmos", "IMAX",
        "[0-9]+bit",  # Match bit depth like 10bit, 8bit, etc.
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
        r'\(\d{4}\)',  # Remove years in parentheses like (1990)
        r'\[[^\]]+\]',  # Remove anything inside square brackets like [i_c]
        r'S\d{1,2}(-S\d{1,2})?',  # Remove season numbers like S01, S01-S02, etc.
        r'E\d{1,2}(-E\d{1,2})?',  # Remove episode numbers like E01, E01-E02, etc.
        r'\d+p',  # Remove video resolutions like 1080p, 720p, etc.
        r'\b\d{1,2}bit\b',  # Remove bit depth like 10bit, 8bit, etc.
        r'\b\d{1,2}\.\d{1,2}\b',  # Remove version numbers like 7.1, 5.1, etc.
        r'-',  # Remove dashes
        r'_',  # Remove underscores
        r'\.',  # Remove dots
        r'\.\.+',  # Remove consecutive dots
        r'^\s+|\s+$',  # Remove leading and trailing spaces
        r'\(',
        r'\)',
        r'[1-9]',
        r'[Mm][Pp]4',
        r'[Ww][Ee][Bb]'
    ]

    series = []

    raw_series = [folder for folder in os.listdir(directory) if os.path.isdir(os.path.join(directory, folder))]

    for series in raw_series:

        raw_serie = series
        files_not_mapped = []

        series = re.sub(r'\.', ' ', series)
        for word in words_to_remove:
            series = re.sub(r'\b' + word + r'\b', '', series, flags=re.IGNORECASE).strip()
        for pattern in patterns_to_remove:
            series = re.sub(pattern, ' ', series)
            series = series.strip()
        series = re.sub(r'  .*', '', series)

        tmdb_series_id = get_series_id_from_title(series)

        serie_episodes = []
        serie_id = 0

        if not Series.objects.filter(tmdb_id=tmdb_series_id).exists():
            series_data = get_series_from_tmdb_id(tmdb_series_id)
            serie_id = Series.objects.create(**series_data)

        if not serie_id:
            serie_id = get_object_or_404(Series, tmdb_id=tmdb_series_id)


        #print(os.path.join(directory, serie))
        for root, _, files in os.walk(os.path.join(directory, raw_serie)):
            for file in files :
                match = re.search(regex, file)
                if match:
                    season_number = int(match.group(1))
                    episode_number = int(match.group(2))
                    serie_episodes.append((season_number, episode_number, os.path.join(root, file).removeprefix(directory).replace("\\", "/")))
                else :
                    files_not_mapped.append(file)


        for season_number, episode_number, file_path in serie_episodes:
            if not Episode.objects.filter(season_number=season_number, episode_number=episode_number, series=serie_id).exists():
                entry = Episode(
                    series=serie_id,
                    season_number=season_number,
                    episode_number=episode_number,
                    file_path=file_path
                )
                entry.save()





if __name__ == '__main__':
    movie_directory = "D:\Movies"
    serie_directory = "D:\Series\\"
    updateMovies(movie_directory)
    updateSeries(serie_directory)


