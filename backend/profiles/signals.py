from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProfileEpisode, ProfileSeries, Profile, ContinueWatchingList


@receiver(post_save, sender=ProfileEpisode)
def create_profile_series(sender, instance, created, **kwargs):
    profile = instance.profile
    episode = instance.episode
    if created:
        if not ProfileSeries.objects.filter(profile=profile,
                                            series=episode.series).exists():
            ProfileSeries.objects.create(
                profile=profile,
                series=episode.series,
            )

        return


@receiver(post_save, sender=Profile)
def create_profile_continue_watching(sender, instance, created, **kwargs):
    profile = instance
    if created:
        if not ContinueWatchingList.objects.filter(profile=profile).exists():
            ContinueWatchingList.objects.create(
                profile=profile,
            )
        return
