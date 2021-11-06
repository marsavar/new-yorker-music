export const Header = () => {
  return (
    <header>
      <h1>The New Yorker Music Project &#127911;</h1>
      <p>
        Hi! Here you can find the New Yorker's Jazz, Rock, and Pop music
        recommendations scraped by a Python script running on AWS Lambda.
        <br /> Hover over the covers to listen to each album's tracks.
      </p>
      <p>
        Want to know how this was built?{" "}
        <a
          href="https://github.com/MarSavar/NewYorkerMusic"
          className="third after"
          target="_blank"
        >
          Click here for the source code
        </a>
      </p>
      <p>
        March 2021 update: only the latest 24 album recommendations are now
        displayed.
      </p>
    </header>
  );
};
