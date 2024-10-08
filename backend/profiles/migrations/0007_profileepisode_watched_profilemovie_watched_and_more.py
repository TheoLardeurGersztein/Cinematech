# Generated by Django 4.2.11 on 2024-08-05 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_alter_profilemovie_watched_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileepisode',
            name='watched',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='profilemovie',
            name='watched',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='profileseries',
            name='watched',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='profileepisode',
            name='watched_time',
            field=models.IntegerField(null=True),
        ),
    ]
