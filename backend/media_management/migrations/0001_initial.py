# Generated by Django 3.2.12 on 2024-03-22 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('director', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('synopsys', models.TextField()),
                ('poster', models.ImageField(upload_to='posters/')),
                ('duration', models.DurationField()),
                ('country_of_origin', models.CharField(max_length=100)),
                ('file_path', models.CharField(max_length=255)),
                ('genres', models.ManyToManyField(to='media_management.Genre')),
            ],
        ),
    ]
