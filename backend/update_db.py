# This script is used for inserting movies from a file
# in the django database without the need of calling the APIs

import os
import re
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from media_management.models import Movie
from media_management.tmdb_API import list_movies


if __name__ == '__main__':


    regex = r'^(.*?)\s\((\d{4})\)'
    directory = "D:\Movies"

    movies = []
    for file in os.listdir(directory):
        match = re.search(regex, file)
        if match:
            movies.append((file, match.group(1), match.group(2)))

    unsure = []

    for movie in movies :
        possible_movies = []
        for possible_movie in list_movies(movie[1]) :
            if possible_movie['release_date'][:4:] == movie[2] :
                possible_movies.append(possible_movie)
        if (len(possible_movies) != 1):
            unsure.append(movie)
        entry = Movie(**possible_movies[0])
        entry.save()

    print("Unsure :")
    print([t[0] for t in unsure])


