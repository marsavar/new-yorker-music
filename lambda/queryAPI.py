import json
from access_bucket import *
from credentials import *
from spotifyAPI import *


def query_spotify_api():

    # Connect to SpotifyAPI
    spotify = SpotifyAPI(client_id, client_secret)
    spotify.perform_auth()

    access_token = spotify.access_token
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    endpoint = "https://api.spotify.com/v1/search"

    # Access JSON file
    content_object = access_s3_bucket()

    try:
        file_content = content_object.get()['Body'].read().decode('utf-8')
        sugg = json.loads(file_content)
    except:
        sugg = dict()

    # Update JSON file
    for k, v in sugg.items():
        for i in range(len(v)):
            # Don't query Spotify if data already present in the JSON file
            if 'id' not in sugg[k][i].keys():
                data = urlencode({"q": f"album:{v[i]['album']} artist:{k}", "type": "album"})
                lookup_url = f"{endpoint}?{data}"
                r = requests.get(lookup_url, headers=headers)
                y = json.loads(r.text)

                try:
                    # Spotify album ID
                    sugg[k][i]['id'] = y['albums']['items'][0]['uri'].split(":")[2]

                except IndexError as e:
                    data = urlencode({"q": f"album:{v[i]['album']}", "type": "album"})
                    lookup_url = f"{endpoint}?{data}"
                    r = requests.get(lookup_url, headers=headers)
                    y = json.loads(r.text)
                    try:
                        # Spotify album ID
                        sugg[k][i]['id'] = y['albums']['items'][0]['uri'].split(":")[2]
                    except IndexError as e:
                        pass

                try:
                    artist_name = y['albums']['items'][0]['artists'][0]['name']

                    # Check that the Spotify artist matches the New Yorker suggestion
                    if artist_name.lower() in k.lower():
                        sugg[k][i]['artist'] = k
                    else:
                        sugg[k][i]['artist'] = None
                except:
                    pass
                try:
                    # Spotify 300x300 album cover URL
                    sugg[k][i]['art'] = y['albums']['items'][0]['images'][1]['url'].split("/")[-1]
                except:
                    pass

    # Update JSON file and upload it to the S3 bucket
    content_object.put(Body=bytes(json.dumps(sugg).encode('UTF-8')), ACL='public-read')