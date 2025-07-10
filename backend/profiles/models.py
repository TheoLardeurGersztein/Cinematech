from django.db import models

from django.contrib.auth.models import User

from media_management.models import Movie, Series, Episode


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profiles', null=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class ProfileMovie(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    liked = models.BooleanField(null=True)
    watched_time = models.IntegerField(null=True)
    def watched(self):
        return self.watched_time > self.movie.duration * 0.9

    class Meta:
        unique_together = ('profile', 'movie')

    def __str__(self):
        return f"{self.profile} - {self.movie}"


class ProfileSeries(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    liked = models.BooleanField(null=True)

    def current_episode(self):
        current_season = self.current_season()
        profile_episodes = ProfileEpisode.objects.filter(profile=self.profile, episode__series=self.series,
                                                         episode__season_number=current_season)
        return max([profile_episode.episode.episode_number for profile_episode in profile_episodes])

    def current_season(self):
        profile_episodes = ProfileEpisode.objects.filter(profile=self.profile, episode__series=self.series)
        return max([profile_episode.episode.season_number for profile_episode in profile_episodes])

    def watched(self):
        profile_episodes = ProfileEpisode.objects.filter(profile=self.profile, episode__series=self.series)
        max_profile_season_episode = max([(profile_episode.episode.season_number, profile_episode.episode.episode_number)
                                  for profile_episode in profile_episodes if profile_episode.watched()], default=(0,0))
        episodes = Episode.objects.filter(series=self.series, season_number=self.series.number_of_seasons)
        last_episode_series = max([episode.episode_number for episode in episodes], default=0)
        return max_profile_season_episode == (self.series.number_of_seasons, last_episode_series)


class ProfileEpisode(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE)
    watched_time = models.IntegerField(null=True)
    def watched(self):
        return self.watched_time > self.episode.duration * 0.8

    class Meta:
        unique_together = ('profile', 'episode')

    def __str__(self):
        return f"{self.profile} - {self.episode}"


class ContinueWatchingList(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def continue_watching(self):
        profile_movies = ProfileMovie.objects.filter(profile=self.profile)
        movies = [profile_movie.movie for profile_movie in profile_movies if not profile_movie.watched()]
        profile_series_list = ProfileSeries.objects.filter(profile=self.profile)
        series = [profile_series.series for profile_series in profile_series_list if not profile_series.watched()]
        return movies, series



