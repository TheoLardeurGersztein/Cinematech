from django.db import models


class MovieGenre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SeriesGenre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    director = models.CharField(max_length=100, null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    synopsis = models.TextField(null=True, blank=True)
    genres = models.ManyToManyField(MovieGenre, blank=True)
    poster = models.URLField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    original_language = models.CharField(max_length=100, null=True, blank=True)
    file_path = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.title


class Series(models.Model):
    title = models.CharField(max_length=255)
    director = models.CharField(max_length=100, null=True, blank=True)
    first_air_date = models.DateField(null=True, blank=True)
    synopsis = models.TextField(null=True, blank=True)
    number_of_episodes = models.IntegerField(null=True, blank=True)
    number_of_seasons = models.IntegerField(null=True, blank=True)
    genres = models.ManyToManyField(SeriesGenre, blank=True)
    poster = models.URLField(null=True, blank=True)
    tmdb_id = models.IntegerField(null=True, blank=True)
    country_of_origin = models.CharField(max_length=100, null=True, blank=True)
    original_language = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "Series"
        verbose_name_plural = "Series"

    def __str__(self):
        return self.title


class Episode(models.Model):
    title = models.CharField(max_length=255)
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='episodes')
    season_number = models.PositiveIntegerField()
    episode_number = models.PositiveIntegerField()
    release_date = models.DateField(null=True, blank=True)
    synopsis = models.TextField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    file_path = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.series.title} - S{self.season_number}E{self.episode_number} - Id {self.id}"
