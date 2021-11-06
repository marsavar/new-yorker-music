import pytest
import boto3
from access_bucket import *
from credentials import *
from spotifyAPI import *

spotify = SpotifyAPI(client_id, client_secret)
bucket = 'newyorker'
file = 'records.json'
content_object = access_s3_bucket()
file_content = content_object.get()['Body'].read().decode('utf-8')
suggestions = json.loads(file_content)


def test_spotify_api_auth1():
    assert spotify.perform_auth() == True


def test_spotify_api_auth2():
    assert type(spotify.get_client_credentials()) is not None


def test_spotify_api_auth3():
    assert type(spotify.get_client_credentials()) == str


def test_spotify_api_auth4():
    decoded_creds = spotify.get_client_credentials()
    encode_creds = base64.b64decode(decoded_creds)
    encode_decode = base64.b64encode(encode_creds).decode()
    assert decoded_creds == encode_decode


def test_spotify_api_auth5():
    data = spotify.get_token_data()
    assert type(data) == dict


def test_spotify_api_auth6():
    data = spotify.get_token_data()
    assert data['grant_type'] == "client_credentials"


def test_spotify_api_auth7():
    data = spotify.get_client_credentials()
    assert spotify.get_token_headers() == {"Authorization": f"Basic {data}"}


def test_access_s3_bucket1():
    assert content_object is not None


def test_suggestions1():
    assert isinstance(suggestions, dict) == True


def test_suggestions2():
    for key, value in suggestions.items():
        assert isinstance(value, list)


def test_suggestions3():
    for key, value in suggestions.items():
        for album in value:
            assert 'album' in album.keys()


