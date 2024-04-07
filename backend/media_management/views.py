from django.http import HttpResponse


from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response


from .models import Movie
from .serializers import MovieSerializer
from .tmdb_API import list_movies, discover_movies
from .torrent_API import torrent_list


def index(request):
    return HttpResponse("Lib movies - Not API related page")

class LibraryMovies(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


#list GET, create POST, retrieve GET with a specific identifier, update for PUT, and destroy for DELETE


class SearchMovies(generics.ListAPIView):
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        data = list_movies(title)
        return Response(data)

class DiscoverMovies(generics.ListAPIView):
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        data = discover_movies()
        return Response(data)




class TorrentList(generics.ListAPIView):

    def get_queryset(self):
        title = self.request.query_params.get('title', '')
        year = self.request.query_params.get('year', '')
        return torrent_list(title, year)

    def list(self, request, *args, **kwargs):
        title = self.request.GET.get('title', '')
        year = self.request.GET.get('year', '')
        data = torrent_list(title, year)
        print(data)
        return Response(data)
