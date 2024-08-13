# Generated by Django 4.2.11 on 2024-07-23 00:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0013_alter_series_options'),
        ('profiles', '0003_remove_profile_account_profile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileSeries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField()),
                ('current_episode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='media_management.episode')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
                ('series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='media_management.series')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileMovie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField()),
                ('watched_time', models.DurationField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='media_management.movie')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileEpisode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('watched_time', models.DurationField()),
                ('episode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='media_management.episode')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
            ],
        ),
    ]
