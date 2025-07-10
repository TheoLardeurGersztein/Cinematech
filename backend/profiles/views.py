from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, ProfileMovie, ProfileEpisode, ContinueWatchingList, ProfileSeries
from .serializers import ProfileSerializer, ProfileMovieSerializer, ProfileEpisodeSerializer, \
    ContinueWatchingSerializer, ProfileSeriesSerializer
from django.shortcuts import get_object_or_404

from media_management.serializers import MovieSerializer

from media_management.serializers import SeriesSerializer


class ProfilesView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        profile_id = request.headers.get('X-Profile-ID')
        if profile_id:  
            try:
                profile = Profile.objects.get(id=profile_id, user=request.user)
                serializer = self.get_serializer(profile)
                return Response(serializer.data)
            except:
                return Response()
        else:
            return Response()


class ProfileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        account_id = request.user.id
        if account_id:
            profiles = Profile.objects.filter(user__id=account_id)
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        else:
            return Response()


class ProfileMovieViewSet(viewsets.ModelViewSet):
    queryset = ProfileMovie.objects.all()
    serializer_class = ProfileMovieSerializer

    def get_object(self):
        movie = self.kwargs.get('movie_id')
        profile = self.kwargs.get('profile_id')
        try:
            return ProfileMovie.objects.get(movie=movie, profile=profile)
        except ProfileMovie.DoesNotExist:
            raise NotFound("ProfileMovie not found")

    def retrieve(self, request, *args, **kwargs):
        try :
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            return Response()
    def update(self, request, *args, **kwargs):
        watched_time = self.request.data.get('watched_time')
        if (watched_time == 0):
            return Response()
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=kwargs.get('partial', False))
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except NotFound:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfileSeriesViewSet(viewsets.ModelViewSet):
    queryset = ProfileSeries.objects.all()
    serializer_class = ProfileSeriesSerializer

    def get_object(self):
        series = self.kwargs.get('series_id')
        profile = self.kwargs.get('profile_id')
        try:
            return ProfileSeries.objects.get(series=series, profile=profile)
        except ProfileMovie.DoesNotExist:
            raise NotFound("ProfileSeries not found")

    def retrieve(self, request, *args, **kwargs):
        try :
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            data={

                'current_episode':'1',
                'current_season':'1'
            }
            return Response(data)



class ProfileEpisodeViewSet(viewsets.ModelViewSet):
    queryset = ProfileEpisode.objects.all()
    serializer_class = ProfileEpisodeSerializer

    def get_object(self):
        episode = self.kwargs.get('episode_id')
        profile = self.kwargs.get('profile_id')
        try:
            return ProfileEpisode.objects.get(episode=episode, profile=profile)
        except ProfileEpisode.DoesNotExist:
            raise NotFound("ProfileEpisode not found")

    def retrieve(self, request, *args, **kwargs):
        try :
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response()
    def update(self, request, *args, **kwargs):
        watched_time = self.request.data.get('watched_time')
        if (watched_time == 0):
            return Response()
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=kwargs.get('partial', False))
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except NotFound:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ContinueWatchingViewSet(viewsets.ModelViewSet):
    queryset = ContinueWatchingList.objects.all()
    serializer_class = ContinueWatchingSerializer

    def retrieve(self, request, *args, **kwargs):
        profile = self.kwargs.get('profile_id')
        continue_watching_list_profile = get_object_or_404(ContinueWatchingList, profile_id=profile)
        continue_watching_list_movie, continue_watching_list_series = continue_watching_list_profile.continue_watching()
        movies = [MovieSerializer(movie).data for movie in continue_watching_list_movie]
        series = [SeriesSerializer(series).data for series in continue_watching_list_series]
        return Response(movies + series)






