# New Yorker Music Project
#### https://mariosavarese.com/projects/newyorkermusic/

### How does it work?
`scraper.py` uses Selenium to scrape https://www.newyorker.com/goings-on-about-town/night-life and collect album 
recommendations. These are then formatted to JSON and saved into `records.json`

`search.py` queries the Spotify API and adds album ids to the JSON file.

`index.html` displays the albums in a fancy way.

### What's next?
Updates only happen when the Python script is run manually, therefore a way is needed to automate the running of the
script.
 
