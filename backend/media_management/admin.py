from .models import Movie, Genre, Downloading_Movie

from django.contrib import admin
from .models import Series, Episode


class EpisodeInline(admin.TabularInline):
    model = Episode
    readonly_fields = ['title', 'season_number', 'episode_number']  # Make specific fields read-only
    fieldsets = (
        (None, {
            'fields': ('title', 'season_number', 'episode_number')  # Specify only desired fields
        }),
    )
    ordering = ['season_number', 'episode_number']  # Order by season and episode number



class SeriesAdmin(admin.ModelAdmin):
    inlines = [EpisodeInline]


admin.site.register(Series, SeriesAdmin)

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Downloading_Movie)
admin.site.register(Episode)
