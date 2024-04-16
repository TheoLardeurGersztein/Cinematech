from rest_framework import serializers
from .models import Movie, Downloading_Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class DownloadingMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Downloading_Movie
        fields = '__all__'