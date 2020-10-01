import boto3
import os
import logging
import uuid
import json
from selenium import webdriver
from queryAPI import query_spotify_api
from spotifyAPI import *
from credentials import *
from scraper import scrape
from queryAPI import *
from access_bucket import *

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):

    # Run scraping function
    scrape()

    # Connect to S3 bucket
    query_spotify_api()

    print("The function ran successfully.")

