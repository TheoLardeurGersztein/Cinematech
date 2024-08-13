"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework import routers



from media_management import views as media_management_views
from profiles import views as profiles_view
from accounts import views as accounts_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'lib/movies', media_management_views.LibraryMovies)
router.register(r'lib/series', media_management_views.LibrarySeries)
router.register(r'downloads', media_management_views.DownloadingMovies)
router.register(r'profiles', profiles_view.ProfilesView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api/movies/search/', media_management_views.SearchMovies.as_view()),
    path('api/movies/discover/', media_management_views.DiscoverMovies.as_view()),
    path('api/series/search/', media_management_views.SearchSeries.as_view()),
    path('api/series/discover/', media_management_views.DiscoverSeries.as_view()),
    path('api/tmdb/series/<int:pk>/',    media_management_views.TmbdSeries.as_view()),
    path('api/torrent/', media_management_views.TorrentList.as_view()),

    path('api/account/info/', accounts_view.AccountInfoView.as_view(), name='account_info'),
    path('api/account/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/account/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/account/profiles/', profiles_view.ProfileListView.as_view(), name='profile-list'),

    path('api/profileepisode/<int:profile_id>/<int:episode_id>/', profiles_view.ProfileEpisodeViewSet.as_view({
        'get': 'retrieve',
        'post': 'update',
    })),

    path('api/profilemovie/<int:profile_id>/<int:movie_id>/', profiles_view.ProfileMovieViewSet.as_view({
        'get': 'retrieve',
        'post': 'update',
    })),

    path('api/profiles/<int:profile_id>/continuewatching/', profiles_view.ContinueWatchingViewSet.as_view({
        'get': 'retrieve',
    })),

    path('api/profileseries/<int:profile_id>/<int:series_id>/', profiles_view.ProfileSeriesViewSet.as_view({
        'get': 'retrieve',
    })),
]
