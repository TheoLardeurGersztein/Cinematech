from django.http import HttpResponse, JsonResponse

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response


from .models import Movie, Series
from .serializers import MovieSerializer, SeriesSerializer, EpisodeSerializer
from .tmdb_movies_API import search_movies, discover_movies
from .tmdb_series_API import search_series, discover_series, get_series_from_tmdb_id

import json


class LibraryMovies(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class LibrarySeries(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

    def retrieve(self, request, pk=None):
        series = self.get_object()
        episodes = series.episodes.all()

        series_serializer = self.get_serializer(series)

        data = series_serializer.data
        data['episodes'] = EpisodeSerializer(episodes, many=True).data 

        return Response(data)


class SearchMovies(generics.ListAPIView):
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        data = search_movies(title)
        return Response(data)


class SearchSeries(generics.ListAPIView):
    serializer_class = SeriesSerializer

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        data = search_series(title)
        return Response(data)


class DiscoverMovies(generics.ListAPIView):
    serializer_class = MovieSerializer
    def list(self, request, *args, **kwargs):
        genre = request.GET.get('genre', None)
        data = discover_movies(genre)
        return Response(data)


class DiscoverSeries(generics.ListAPIView):
    serializer_class = SeriesSerializer

    def list(self, request, *args, **kwargs):
        genre = request.GET.get('genre', None)
        data = discover_series(genre)
        return Response(data)


class TmbdSeries(generics.ListAPIView):
    def get(self, request, pk):
        data = get_series_from_tmdb_id(pk)  # Use pk as the TMDB ID
        if data:
            return Response(data)
