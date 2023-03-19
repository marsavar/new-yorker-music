# The New Yorker Music Project 🎧

### November 2021 notes
Rewrote the frontend in React. 
The original Python code running on AWS Lambda remains untouched (and ugly).

### How does it work?
The script uses Selenium, which runs a headless version of Chrome and scrapes
 [the New Yorker website](https://www.newyorker.com/goings-on-about-town/night-life) in order to collect Jazz, Rock, 
 and Pop music recommendations. These are then formatted to JSON, saved into an S3 bucket, and if considered valid
 recommendations, displayed on the website. Suggestions such music events, festivals, etc. are not considered valid
 and are therefore ignored.
 
A CloudWatch event running every six hours triggers the invocation of `lambda_function.py`.

### How can I run it?

#### Lambda 
You can test the project locally on Docker by running the command `make lambda-run` from the main
project folder.

Please note that a file named `credentials.py` is needed within the `lambda/src` folder in order to run the build successfully.
This is because connecting to both the Spotify API and AWS requires authentication (`client_id`, `client_secret` for 
Spotify; `aws_access_key_id`, `aws_secret_access_key` for AWS).
 
 The build is deployed by running the command `make lambda-build`.

 #### Frontend
 
`cd` into `remix-app`, then run `npm run install` to install the required dependencies,
then run `npm run dev` to start the local development server.

A local version of the website will be available at `http://localhost:3000`

The app is currently deployed to production with [fly.io](https://fly.io).

 ### Acknowledgements
 
[jairovadillo](https://github.com/jairovadillo) for his groundwork on
 [pychromeless](https://github.com/jairovadillo/pychromeless)

