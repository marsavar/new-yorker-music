from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.newyorker.com/goings-on-about-town/night-life")

assert "The New Yorker" in driver.title

elements = driver.find_elements_by_class_name("title")

suggestions = dict()

for elem in elements:
    try:
        full_suggestion = elem.get_attribute("textContent").split(":")
        artist, piece = full_suggestion[0], full_suggestion[1]
        suggestions[artist] = ["piece",piece.strip().lstrip("“").rstrip("”")]
    except:
        suggestions[artist] = ["album", artist]

for k,v in suggestions.items():
    print(k,v)

driver.close()
