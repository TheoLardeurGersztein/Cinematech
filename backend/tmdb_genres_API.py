import requests

api_key = "5a910ade2d976fa5b6e7dc502263316b"
api_url_base = f"https://api.themoviedb.org/3/"
url_api_key = f"?api_key={api_key}"

image_size = "w400"
image_url = f"https://image.tmdb.org/t/p/{image_size}"
default_image_url = 'default_poster.jpeg'
header = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTkxMGFkZTJkOTc2ZmE1YjZlN2RjNTAyMjYzMzE2YiIsInN1YiI6IjY2MDY4NTQwZjkxODNhMDE3ZjQ3OTA1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aYjgFjq1KsVIUuqqJsoPO7d5aBwvqhtGo7ARQc5qfF8"
}


def get_movie_genres_from_tmdb():
    response = requests.get(f"{api_url_base}genre/movie/list?language=en", headers=header)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def get_series_genres_from_tmdb():
    response = requests.get(f"{api_url_base}genre/tv/list?language=en", headers=header)
    if response.status_code == 200:
        return response.json()
    else:
        return None






