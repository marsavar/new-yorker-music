import pytest
from credentials import *
from spotifyAPI import *

spotify = SpotifyAPI(client_id, client_secret)


def test_Spotify_API_auth():
    assert spotify.perform_auth() == True


def test_Spotify_API_auth2():
    assert type(spotify.get_client_credentials()) is not None


def test_Spotify_API_auth3():
    assert type(spotify.get_client_credentials()) == str


def test_Spotify_API_auth4():
    decoded_creds = spotify.get_client_credentials()
    encode_creds = base64.b64decode(decoded_creds)
    encode_decode = base64.b64encode(encode_creds).decode()
    assert decoded_creds == encode_decode

def test_Spotify_API_auth5():
    data = spotify.get_token_data()
    assert type(data) == dict

def test_Spotify_API_auth6():
    data = spotify.get_token_data()
    assert data['grant_type'] == "client_credentials"