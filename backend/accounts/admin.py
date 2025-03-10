from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from profiles.admin import ProfileInline
from profiles.models import Profile


class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline]
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
    )

    list_display = ('username',)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)