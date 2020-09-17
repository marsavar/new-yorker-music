from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.newyorker.com/goings-on-about-town/night-life")

assert "The New Yorker" in driver.title

elements = driver.find_elements_by_class_name("title")

suggestions = dict()

for elem in elements:
    try:
        full_suggestion = elem.get_attribute("textContent").split(":")
        artist, piece = full_suggestion[0], full_suggestion[1].strip().lstrip("“").rstrip("”")
        suggestion_type = "piece"
    except IndexError:
        suggestion_type = "album"
        artist = piece = elem.get_attribute("textContent")

    if artist not in suggestions.keys():
        suggestions[artist] = [(suggestion_type, piece)]
    else:
        suggestions[artist].append((suggestion_type, artist))

for k, v in suggestions.items():
    print(k," ->", v)

driver.close()
