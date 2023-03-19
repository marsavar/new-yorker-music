export const Header = () => {
  return (
    <header>
      <h1>The New Yorker Music Project &#127911;</h1>
      <p>
        An archive of the{" "}
        <a
          rel="external noreferrer"
          href="https://www.newyorker.com/goings-on-about-town/night-life"
        >
          New Yorker's Jazz, Rock, and Pop music recommendations
        </a>{" "}
        scraped by a Lambda function that has been running on AWS since
        September 2020.
        <br /> Hover over the covers to listen to each album's tracks.
      </p>
    </header>
  );
};
