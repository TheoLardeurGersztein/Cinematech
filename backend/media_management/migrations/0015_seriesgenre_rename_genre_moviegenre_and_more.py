# Generated by Django 4.2.11 on 2024-08-08 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0014_genre_tmdb_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeriesGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('tmdb_id', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.RenameModel(
            old_name='Genre',
            new_name='MovieGenre',
        ),
        migrations.AlterField(
            model_name='series',
            name='genres',
            field=models.ManyToManyField(blank=True, to='media_management.seriesgenre'),
        ),
    ]
