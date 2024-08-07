from django.db import models

from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profiles', null=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
