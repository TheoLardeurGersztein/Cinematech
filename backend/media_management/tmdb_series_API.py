import requests

api_key = "5a910ade2d976fa5b6e7dc502263316b"
api_url_base = f"https://api.themoviedb.org/3/"
url_api_key = f"?api_key={api_key}"

image_size = "w400"
image_url = f"https://image.tmdb.org/t/p/{image_size}"
default_image_url = 'default_poster.jpeg'
header = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTkxMGFkZTJkOTc2ZmE1YjZlN2RjNTAyMjYzMzE2YiIsInN1YiI6IjY2MDY4NTQwZjkxODNhMDE3ZjQ3OTA1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aYjgFjq1KsVIUuqqJsoPO7d5aBwvqhtGo7ARQc5qfF8" \
 }

def treat_list_series_response(response) :
    genres_ids = [genre['id'] for genre in response.json()['results']]
    new_data = [{
        'title': item['name'],
        'tmdb_id' : item['id'],
        'poster': image_url + str(item['poster_path']) if item['poster_path'] is not None else default_image_url,
        'genres_ids': genres_ids,
        'original_language': item['original_language'],
        'synopsis': item['overview'],
        'first_air_date': item['first_air_date']
    } for item in response.json()['results']]
    return new_data

def treat_detailed_series_response(response) :
    data = response.json()
    genres_ids = [genre['id'] for genre in data['genres']]
    new_data = {
        'title': data['name'],
        'tmdb_id' : data['id'],
        'number_of_episodes' : data['number_of_episodes'],
        'number_of_seasons' : data['number_of_seasons'],
        'poster': image_url + str(data['poster_path']) if data['poster_path'] is not None else default_image_url,
        'genres_ids': genres_ids,
        'original_language': data['original_language'],
        'country_of_origin' : data['origin_country'],
        'synopsis': data['overview'],
        'first_air_date': data['first_air_date']
    }
    return new_data

def treat_episode_response(response):
    data = response.json()
    new_data = {
    }
    return new_data


def discover_series():
    response = requests.get(f"{api_url_base}discover/tv?language=en-US", headers=header)
    new_data = treat_list_series_response(response)
    if response.status_code == 200:
        return new_data
    else:
        return None

def search_series(title):
    response = requests.get(f"{api_url_base}search/tv?query={title}&page=1", headers=header)
    new_data = treat_list_series_response(response)
    if response.status_code == 200:
        return new_data
    else:
        return None



def get_series_from_tmdb_id(id):
    response = requests.get(f"{api_url_base}tv/{id}?language=en-US", headers=header)
    new_data = treat_detailed_series_response(response)
    if response.status_code == 200:
        return new_data
    else:
        return None

def get_episode_from_tmdb(season_number, episode_number, series_id) :
    response = requests.get(f"{api_url_base}tv/{series_id}/season/{season_number}/episode/{episode_number}?language=en-US", headers=header)
    treat_episode_response(response)
    return

def get_series_id_from_title(title):
    response = requests.get(f"{api_url_base}search/tv?query={title}&page=1", headers=header)
    new_data = treat_list_series_response(response)
    if len(new_data) == 0 :
        return None
    else:
        return new_data[0]['tmdb_id']






