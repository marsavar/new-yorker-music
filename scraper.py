from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

driver.get("https://www.newyorker.com/goings-on-about-town/night-life")

assert "The New Yorker" in driver.title

elements = driver.find_elements_by_class_name("title")

suggestions = dict()

for elem in elements:
    try:
        full_suggestion = elem.get_attribute("textContent").split(":")
        artist, track = full_suggestion[0], full_suggestion[1].strip().lstrip("“").rstrip("”")
        suggestion_type = "tracks"
    except IndexError:
        suggestion_type = "albums"
        artist = track = elem.get_attribute("textContent")

    if artist not in suggestions.keys():
        suggestions[artist] = {suggestion_type:[track]}

    else:
        suggestions[artist][suggestion_type].append(track)

driver.close()

with open('records.txt','w') as records:
    json.dump(suggestions, records)