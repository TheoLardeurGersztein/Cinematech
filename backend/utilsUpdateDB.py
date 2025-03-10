import json
import os
import re

from moviepy.video.io.VideoFileClip import VideoFileClip

from tmdb_genres_API import get_movie_genres_from_tmdb


def get_release_year(file_name):
    regex = '(\d{4})'
    movie_match = re.search(regex, file_name)
    if movie_match:
        release_year = movie_match.group(0)
        if release_year in ['1080','2048','4096']:
            return None
        else:
            return release_year
    return None

def get_resolution(file_name):
    resolutions = ['1080','720','360','4k','4K','2080','8k','8K']
    for resolution in resolutions:
        if resolution in file_name:
            return resolution

def get_file_path_and_duration_movies(directory, file_path):
    files_in_fodler = os.listdir(os.path.join(directory, file_path))
    for file_in_folder in files_in_fodler:
        if file_in_folder.endswith('.mp4') or file_in_folder.endswith('.mkv'):
            video = VideoFileClip(os.path.join(directory,file_path,file_in_folder))
            duration = video.duration
            return file_path + '/' + file_in_folder, duration
    return None, None


def get_duration_series(file_path):
    if file_path.endswith('.mp4') or file_path.endswith('.mkv'):
        video = VideoFileClip(os.path.join(file_path))
        duration = video.duration
        return duration


def get_season_and_episode_number(file_path):
    regex = (r'S(\d+)E(\d+)')
    match = re.search(regex, file_path, flags=re.IGNORECASE)
    if match:
        season_number = int(match.group(1))
        episode_number = int(match.group(2))
        return season_number, episode_number
    else:
        return None, None

def clean_up_file_path(file_path):
    chars_to_remove = ['.','"',';','\'','(',')','^','*','<','>','|','\\',']','[','_']
    for char_to_remove in chars_to_remove:
        file_path = re.sub(re.escape(char_to_remove), ' ', file_path)
    non_title_words = [
        '1080p', '720p', '4k', '8k', 'bluray', 'webrip', 'mx', 'dvd', 'hd',
        'h264', 'aac', 'x265', '10bit', '5.1', 'repack', 'drama', 'french',
        'ensub', 'remastered', 'korean', 'english', 'drama', 'musical', 'x264',
        'mp4', 'mkv', 'ac3', 'rarbg', 'etrg', 'swedish', 'vxt', 'mxs', 'repack',
        'web-dl', 'unreated', 'vostfr', 'extended', 'director', 'directors', 'cut',
        'season', 'episode', 'yts', 'web', 'uhd', 'dvdrip', 'hevc', 'dts', 'dolby',
        'bone', 'dd5', 'complete'
    ]
    for non_title_word in non_title_words:
        file_path = re.sub(non_title_word, ' ', file_path, flags=re.IGNORECASE)
    regexes_to_remove = ['s\d{2}', 'e\d{2}', '\d{4}', '[0-9]\.[0-9]']
    for regex_to_remove in regexes_to_remove:
        file_path = re.sub(regex_to_remove, ' ', file_path, flags=re.IGNORECASE)
    return re.sub(r'  .*', '', file_path)


def get_info_movie_from_file_name(directory, file_name):
    release_year = get_release_year(file_name)
    resolution = get_resolution(file_name)
    file_path, duration = get_file_path_and_duration_movies(directory, file_name)
    title = clean_up_file_path(file_name)
    data = {
        "title": title,
        "release_year": release_year,
        "resolution": resolution,
        "file_path": file_path,
        "duration": duration
    }
    return json.dumps(data)


def get_info_episode_from_file_name(directory, file_name):
    resolution = get_resolution(file_name)
    duration = get_duration_series(os.path.join(directory, file_name))
    season_number, episode_number = get_season_and_episode_number(file_name)
    data = {
        "resolution": resolution,
        "duration": duration,
        "season_number": season_number,
        "episode_number": episode_number
    }

    return json.dumps(data)

