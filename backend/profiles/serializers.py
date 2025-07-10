from rest_framework import serializers
from .models import Profile, ProfileMovie, ProfileEpisode, ContinueWatchingList, ProfileSeries


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileMovie
        fields = '__all__'


class ProfileSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileSeries
        fields = ['profile','series','liked','current_episode','current_season']
        def current_episode(self, obj):
            return obj.current_episode()
        def current_season(self, obj):
            return obj.episode()


class ProfileEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileEpisode
        fields = '__all__'
        fields = ['profile','episode','watched_time','watched']

        def watched(self, obj):
            return obj.watched()


class ContinueWatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContinueWatchingList
        fields = '__all__'


