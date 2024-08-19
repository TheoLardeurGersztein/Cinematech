# Generated by Django 4.2.11 on 2024-08-08 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0016_remove_moviegenre_tmdb_id_remove_seriesgenre_tmdb_id'),
        ('profiles', '0010_continuewatchinglist_series_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='continuewatchinglist',
            name='media_type',
        ),
        migrations.RemoveField(
            model_name='continuewatchinglist',
            name='movie',
        ),
        migrations.RemoveField(
            model_name='continuewatchinglist',
            name='series',
        ),
        migrations.AddField(
            model_name='continuewatchinglist',
            name='continue_watching_movies',
            field=models.ManyToManyField(blank=True, to='media_management.movie'),
        ),
        migrations.AddField(
            model_name='continuewatchinglist',
            name='continue_watching_series',
            field=models.ManyToManyField(blank=True, to='media_management.series'),
        ),
    ]