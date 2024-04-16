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
    poster = models.URLField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    original_language = models.CharField(max_length=100, null=True, blank=True)
    file_path = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.title


class Downloading_Movie(models.Model):
    movie = models.OneToOneField(Movie, on_delete=models.CASCADE, primary_key=True, default=None)
    title = models.CharField(max_length=255, null=True, blank=True)
    download_percentage = models.IntegerField(default=0, null=True, blank=True)  # 0-100
    download_url = models.URLField(null=True, blank=True)
    download_status = models.CharField(max_length=255, choices=[
        ("Completed", "Completed"),
        ("Downloading", "Downloading"),
        ("Failed", "Failed"),
    ], null=True, blank=True)
    downloaded_from = models.CharField(max_length=255, choices=[
        ("YTS", "YTS"),
    ], null=True, blank=True)

