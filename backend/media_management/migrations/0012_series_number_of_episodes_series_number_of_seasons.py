# Generated by Django 4.2.11 on 2024-05-20 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0011_series_tmdb_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='series',
            name='number_of_episodes',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='series',
            name='number_of_seasons',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
