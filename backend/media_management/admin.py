from django.contrib import admin

from .models import Movie, Genre, Downloading_Movie

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Downloading_Movie)

