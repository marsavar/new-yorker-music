from spotifyAPI import *
from credentials import *

spotify = SpotifyAPI(client_id, client_secret)
spotify.perform_auth()

access_token = spotify.access_token
headers = {
    "Authorization": f"Bearer {access_token}"
}
endpoint = "https://api.spotify.com/v1/search"

with open('records.json', 'r') as suggestions:
    sugg = json.load(suggestions)

all_ids = []

for k, v in sugg.items():
    for i in range(len(v)):
        data = urlencode({"q": f"album:{v[i]['album']} artist:{k}", "type": "album"})
        lookup_url = f"{endpoint}?{data}"
        r = requests.get(lookup_url, headers=headers)
        y = json.loads(r.text)
        try:
            id = y['albums']['items'][0]['uri'].split(":")[2]
            all_ids.append(id)
            sugg[k][i]['id'] = id
        except:
            data = urlencode({"q": f"album:{v[i]['album']}", "type": "album"})
            lookup_url = f"{endpoint}?{data}"
            r = requests.get(lookup_url, headers=headers)
            y = json.loads(r.text)
            id = y['albums']['items'][0]['uri'].split(":")[2]
            all_ids.append(id)
            sugg[k][i]['id'] = id

with open('records.json', 'w') as suggestions:
    json.dump(sugg, suggestions)
