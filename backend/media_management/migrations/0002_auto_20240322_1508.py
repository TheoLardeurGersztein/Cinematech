# Generated by Django 3.2.12 on 2024-03-22 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='country_of_origin',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='director',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='duration',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='file_path',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.ImageField(null=True, upload_to='posters/'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='release_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='synopsys',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='movie',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
