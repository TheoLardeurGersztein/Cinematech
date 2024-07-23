from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 0  # Number of blank forms to display

class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline]
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
    )

    # Display these fields in the list view
    list_display = ('username',)


admin.site.register(Profile)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)