from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

driver.get('https://www.newyorker.com/goings-on-about-town/night-life')

assert 'The New Yorker' in driver.title

elements = driver.find_elements_by_class_name('title')

with open('records.json','r') as records:
    try:
        suggestions = json.load(records)
    except:
        suggestions = dict()

with open('records.json','w') as records:

    added = 0

    for elem in elements:
        try:
            full_suggestion = elem.get_attribute('textContent').split(':')
            artist, album = full_suggestion[0], full_suggestion[1].strip().lstrip('“').rstrip('”')
        except IndexError:
            artist = album = elem.get_attribute('textContent')

        if artist not in suggestions.keys():
            suggestions[artist] = [{'album':album}]
            added += 1

        elif album not in suggestions[artist]:
            suggestions[artist].append({'album':album})

    json.dump(suggestions, records)

driver.close()

print("Added",added,"albums")