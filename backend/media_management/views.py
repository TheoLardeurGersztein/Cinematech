from django.http import HttpResponse, JsonResponse

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response


from .models import Movie, Downloading_Movie, Series
from .serializers import MovieSerializer, DownloadingMovieSerializer, SeriesSerializer, EpisodeSerializer
from .tmdb_movies_API import search_movies, discover_movies
from .tmdb_series_API import search_series, discover_series, get_series_from_tmdb_id
from .torrent_API import torrent_list, yts_dowload_torrent

import json

def index(request):
    return HttpResponse("Lib movies - Not API related page")

class LibraryMovies(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class LibrarySeries(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

    def retrieve(self, request, pk=None):
        series = self.get_object()
        episodes = series.episodes.all()

        # Serialize the series object itself using SeriesSerializer
        series_serializer = self.get_serializer(series)

        # Include episodes as a separate key in the response dictionary
        data = series_serializer.data
        data['episodes'] = EpisodeSerializer(episodes, many=True).data  # Serialize all episodes

        return Response(data)

#list GET, create POST, retrieve GET with a specific identifier, update for PUT, and destroy for DELETE


class SearchMovies(generics.ListAPIView):
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        data = search_movies(title)
        print(data)
        return Response(data)

class SearchSeries(generics.ListAPIView):
    serializer_class = SeriesSerializer

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        data = search_series(title)
        print(data)
        return Response(data)


class DiscoverMovies(generics.ListAPIView):
    serializer_class = MovieSerializer
    def list(self, request, *args, **kwargs):
        data = discover_movies()
        return Response(data)

class DiscoverSeries(generics.ListAPIView):
    serializer_class = SeriesSerializer

    def list(self, request, *args, **kwargs):
        data = discover_series()
        return Response(data)


class DownloadingMovies(viewsets.ModelViewSet):
    queryset = Downloading_Movie.objects.all()
    serializer_class = DownloadingMovieSerializer

    def create(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            movie = data['movie']
            download = data['download']
            source, url = yts_dowload_torrent(download['url'], download['hash'])
            new_movie = Movie.objects.create(**movie)
            Downloading_Movie.objects.create(
                movie=new_movie,
                title=movie['title'],
                download_url=url,
                download_status="Downloading",
                downloaded_from=source
            )
        except ValueError:
            return JsonResponse(
                self.invalid_json_response,
                status=self.invalid_json_http_status)
        return Response()



class TorrentList(generics.ListAPIView):

    def get_queryset(self):
        title = self.request.query_params.get('title', '')
        year = self.request.query_params.get('year', '')
        return torrent_list(title, year)

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        year = self.request.GET.get('year', '')
        data = torrent_list(title, year)
        return Response(data)




class TmbdSeries(generics.ListAPIView):
    def get(self, request, pk):
        data = get_series_from_tmdb_id(pk)  # Use pk as the TMDB ID
        print(data)
        if data:
            return Response(data)
