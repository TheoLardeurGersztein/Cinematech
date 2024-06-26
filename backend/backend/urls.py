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

from media_management import views

router = routers.DefaultRouter()
router.register(r'lib/movies', views.LibraryMovies)
router.register(r'lib/series', views.LibrarySeries)
router.register(r'downloads', views.DownloadingMovies)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api/movies/search/', views.SearchMovies.as_view()),
    path('api/movies/discover/', views.DiscoverMovies.as_view()),
    path('api/series/search/', views.SearchSeries.as_view()),
    path('api/series/discover/', views.DiscoverSeries.as_view()),
    path('api/tmdb/series/<int:pk>/', views.TmbdSeries.as_view()),
    path('api/torrent/', views.TorrentList.as_view()),

]
