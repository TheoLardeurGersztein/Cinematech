from django.http import HttpResponse


from rest_framework import viewsets


from .models import Movie
from .serializers import MovieSerializer


def index(request):
    return HttpResponse("Lib movies - Not API related page")

class GetMovies(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

