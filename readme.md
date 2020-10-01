# The New Yorker Music Project 🎧
#### https://mariosavarese.com/projects/newyorkermusic/

### How does it work?
The script uses Selenium, which runs a headless version of Chrome and scrapes
 https://www.newyorker.com/goings-on-about-town/night-life in order to collect Jazz, Rock, and Pop music
 recommendations. These are then formatted to JSON and saved into an S3 bucket and displayed
 on the website.
 
A CloudWatch event running every six hours triggers the invocation of `lambda_function.py`.
 
### How can I run it?

You can test the project locally on Docker by running the command `make lambda-run` from the main
project folder.

Please note that a file named `credentials.py` is needed within the `src` folder in order to run the build successfully.
This is because connecting to both the Spotify API and AWS requires authentication (`client_id`, `client_secret` for Spotify; 
 `aws_access_key_id`, `aws_secret_access_key` for AWS).
 
 The build is deployed by running the command `make lambda-build`.