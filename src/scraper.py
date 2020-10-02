import os
import boto3
import json
from selenium import webdriver
from credentials import *
from access_bucket import *


def scrape():
    # Set up headless Chrome
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1280x1696')
    chrome_options.add_argument('--user-data-dir=/tmp/user-data')
    chrome_options.add_argument('--hide-scrollbars')
    chrome_options.add_argument('--enable-logging')
    chrome_options.add_argument('--log-level=0')
    chrome_options.add_argument('--v=99')
    chrome_options.add_argument('--single-process')
    chrome_options.add_argument('--data-path=/tmp/data-path')
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--homedir=/tmp')
    chrome_options.add_argument('--disk-cache-dir=/tmp/cache-dir')
    chrome_options.add_argument(
        'user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 '
        'Safari/537.36')
    chrome_options.binary_location = os.getcwd() + "/bin/chromium"

    driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=os.getcwd() + "/bin/chromedriver")

    # Page to scrape
    driver.get('https://www.newyorker.com/goings-on-about-town/night-life')
    elements = driver.find_elements_by_class_name('title')

    # Access s3 bucket to retrieve JSON file
    content_object = access_s3_bucket()

    try:
        file_content = content_object.get()['Body'].read().decode('utf-8')
        suggestions = json.loads(file_content)
    except:
        suggestions = dict()

    added = 0

    # Add artists and albums to the dictionary
    for elem in elements:
        try:
            full_suggestion = elem.get_attribute('textContent').split(':')
            artist, album = full_suggestion[0], full_suggestion[1].strip().lstrip('“').rstrip('”')
        except IndexError:
            artist = album = elem.get_attribute('textContent')

        if artist not in suggestions.keys():
            suggestions[artist] = [{'album': album}]
            added += 1

        elif not any(d['album'] == album for d in suggestions[artist]):
            suggestions[artist].append({'album': album})
            added += 1

    # Convert dictionary to JSON file and uploads it to S3 bucket
    content_object.put(Body=bytes(json.dumps(suggestions).encode('UTF-8')), ACL='public-read')

    driver.close()

    print("Added", added, "albums")