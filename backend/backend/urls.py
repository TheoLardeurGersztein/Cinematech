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
router.register(r'profiles', profiles_view.ProfilesView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api/movies/search/', media_management_views.SearchMovies.as_view()),
    path('api/movies/discover/', media_management_views.DiscoverMovies.as_view()),
    path('api/series/search/', media_management_views.SearchSeries.as_view()),
    path('api/series/discover/', media_management_views.DiscoverSeries.as_view()),
    path('api/tmdb/series/<int:pk>/',    media_management_views.TmbdSeries.as_view()),

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
