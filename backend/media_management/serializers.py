from rest_framework import serializers
from .models import Movie, Downloading_Movie, Episode, Series


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class DownloadingMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downloading_Movie
        fields = '__all__'

class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = '__all__'

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'  # Include all fields for now (adjust as needed)
