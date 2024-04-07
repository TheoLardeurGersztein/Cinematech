import requests

yts_url = "https://yts.mx/api/v2/"

def treat_yts_list(title, response):
    new_data = [{
        'title' : title,
        'quality': item['quality'],
        'seeds': item['seeds'],
        'peers': item['peers'],
        'size': item['size'],
        'url': item['url'],
        'date_uploaded': item['date_uploaded'],
        'source': 'yts'
    } for item in response.json()['data']['movie']['torrents']]
    return new_data

def yts_torrent_list(title, release_date):
    year = release_date[:4:]
    list_movies = requests.get(f"{yts_url}list_movies.json/?query_term={title}")
    torrents = []
    if list_movies.json()['data']['movie_count'] > 0:
        for movie in list_movies.json()['data']['movies']:
            if movie['title'] == title and (int(movie['year']) == int(year)):
                print(requests.get(f"{yts_url}movie_details.json/?movie_id={movie['id']}").json())
                torrents.extend(
                    treat_yts_list(movie['id'], requests.get(f"{yts_url}movie_details.json/?movie_id={movie['id']}"))
                )
    return torrents


def torrent_list(title, year):
    torrents = []
    torrents.extend(yts_torrent_list(title, year))
    return torrents



