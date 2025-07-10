from django.contrib import admin

from .models import Profile, ProfileMovie, ProfileSeries, ProfileEpisode, ContinueWatchingList


class ProfileInline(admin.StackedInline):
    model = Profile


class ProfileMovieInline(admin.StackedInline):
    model = ProfileMovie


class ProfileSeriesInline(admin.StackedInline):
    model = ProfileSeries


class ProfileEpisodeInline(admin.StackedInline):
    model = ProfileEpisode


class CustomProfileAdmin(admin.ModelAdmin):
    inlines = [ProfileMovieInline, ProfileSeriesInline, ProfileEpisodeInline]


class CustomProfileMovie(admin.ModelAdmin):
    model = ProfileMovie

    def display_watched(self, obj):
        return obj.watched

    readonly_fields = ('watched',)

    fieldsets = (
        (None, {
            'fields': ('profile', 'movie', 'liked', 'watched_time', 'watched')
        }),
    )


class CustomProfileSeries(admin.ModelAdmin):
    model = ProfileSeries
    def display_watched(self, obj):
        return obj.watched
    def display_current_episode(self, obj):
        return obj.current_episode
    def display_current_season(self, obj):
        return obj.current_season
    readonly_fields = ('watched', 'current_episode', 'current_season')
    fieldsets = (
        (None, {
            'fields': ('profile', 'series', 'liked', 'current_episode', 'current_season', 'watched', )
        }),
    )


class CustomProfileEpisode(admin.ModelAdmin):
    model = ProfileEpisode
    def display_watched(self, obj):
        return obj.watched
    readonly_fields = ('watched',)
    fieldsets = (
        (None, {
            'fields': ('profile', 'movie', 'liked', 'watched_time', 'watched')
        }),
    )


class CustomContinueWatching(admin.ModelAdmin):
    model = ContinueWatchingList
    def display_continue_watching(self, obj):
        return obj.continue_watching
    readonly_fields = ('continue_watching',)

    fieldsets = (
        (None, {
            'fields': ('profile', 'continue_watching' )
        }),
    )


admin.site.register(Profile, CustomProfileAdmin)

admin.site.register(ProfileMovie, CustomProfileMovie)
admin.site.register(ProfileEpisode, CustomProfileEpisode)
admin.site.register(ProfileSeries, CustomProfileSeries)
admin.site.register(ContinueWatchingList, CustomContinueWatching)

