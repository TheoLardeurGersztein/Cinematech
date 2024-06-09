import requests


api_key = "5a910ade2d976fa5b6e7dc502263316b"
api_url_base = f"https://api.themoviedb.org/3/"
url_api_key = f"?api_key={api_key}"

image_size = "w400"
image_url = f"https://image.tmdb.org/t/p/{image_size}"
#default_image_url = "../../../resources/default_poster.jpeg"
default_image_url = 'default_poster.jpeg'
header = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTkxMGFkZTJkOTc2ZmE1YjZlN2RjNTAyMjYzMzE2YiIsInN1YiI6IjY2MDY4NTQwZjkxODNhMDE3ZjQ3OTA1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aYjgFjq1KsVIUuqqJsoPO7d5aBwvqhtGo7ARQc5qfF8"
}


def treat_response(response) :
    new_data = [{
        'title': item['title'],
        'poster': image_url + str(item['poster_path']) if item['poster_path'] is not None else default_image_url,
        #'genre_ids': item['genre_ids'], # TODO Implement Genres
        'original_language': item['original_language'],
        'synopsis': item['overview'],
        'release_date': item['release_date']
    } for item in response.json()['results']]
    return new_data

def discover_movies():
    response = requests.get(f"{api_url_base}discover/movie?language=en-US", headers=header)
    new_data = treat_response(response)
    if response.status_code == 200:
        return new_data
    else:
        return None

def search_movies(title):
    response = requests.get(f"{api_url_base}search/movie?query={title}&page=1", headers=header)
    new_data = treat_response(response)
    if response.status_code == 200:
        return new_data
    else:
        return None




