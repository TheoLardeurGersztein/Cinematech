import requests

yts_url = "https://yts.mx/api/v2/"
yts_magnet = "magnet:?xt=urn:btih:"
tracker_url = "udp://tracker.openbittorrent.com:80"

def yts_treat_response(title, response):
    new_data = [{
        'title' : title,
        'quality': item['quality'],
        'seeds': item['seeds'],
        'peers': item['peers'],
        'size': item['size'],
        'url': item['url'],
        'hash' : item['hash'],
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
                torrents.extend(
                    yts_treat_response(movie['id'], requests.get(f"{yts_url}movie_details.json/?movie_id={movie['id']}"))
                )
    return torrents


def yts_dowload_torrent(url, hash):
    magnet_link = f"magnet:?xt=urn:btih:{hash}&dn={url}&tr={tracker_url}"
    print("Downloading torrent...")
    return "YTS", magnet_link


def torrent_list(title, year):
    torrents = []
    torrents.extend(yts_torrent_list(title, year))
    return torrents


