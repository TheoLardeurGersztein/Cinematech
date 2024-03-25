from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    director = models.CharField(max_length=100, null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    synopsis = models.TextField(null=True, blank=True)
    genres = models.ManyToManyField(Genre)
    poster = models.ImageField(upload_to='posters/', null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    file_path = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.title



