# Generated by Django 4.2.11 on 2024-05-09 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0007_downloading_movie_title_alter_movie_poster'),
    ]

    operations = [
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('director', models.CharField(blank=True, max_length=100, null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('synopsis', models.TextField(blank=True, null=True)),
                ('poster', models.URLField(blank=True, null=True)),
                ('country_of_origin', models.CharField(blank=True, max_length=100, null=True)),
                ('original_language', models.CharField(blank=True, max_length=100, null=True)),
                ('genres', models.ManyToManyField(to='media_management.genre')),
            ],
        ),
        migrations.CreateModel(
            name='Episode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('season_number', models.PositiveIntegerField()),
                ('episode_number', models.PositiveIntegerField()),
                ('release_date', models.DateField(blank=True, null=True)),
                ('synopsis', models.TextField(blank=True, null=True)),
                ('duration', models.IntegerField(blank=True, null=True)),
                ('file_path', models.CharField(blank=True, max_length=255, null=True)),
                ('series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='episodes', to='media_management.series')),
            ],
        ),
    ]