import { FC, useEffect, useState } from "react";
import { ValidAlbum } from "./App";
import { Card } from "./Card";

export const isValid = (album: any): boolean => {
  return (
    album.hasOwnProperty("id") &&
    album.hasOwnProperty("art") &&
    album.artist !== null
  );
};

export const MainBody: FC = () => {
  window.onload = async () => {
    const getAlbums = await fetch(allAlbums);
    const json = await getAlbums.json();
    const validAlbums = Object.values(json)
      .flat()
      .reverse()
      .filter(isValid) as ValidAlbum[];
    setAllRecords(validAlbums);
    setInitialRecords(validAlbums);
  };

  const searchBar = document.getElementById("searchBar") as HTMLInputElement;
  const handleChange = (val: string) => {
    if (val.length > 0) {
      const findAlbums = initialRecords.filter(
        (a) =>
          a.album.toLowerCase().includes(val.toLowerCase()) ||
          a.artist.toLowerCase().includes(val.toLowerCase())
      );
      setAllRecords(findAlbums);
      const numberOfAlbumsFound = findAlbums.length;
      setResults(numberOfAlbumsFound);
    } else {
      setAllRecords(initialRecords);
      setResults(0);
    }
  };

  const feelingLucky = () => {
    const randomAlbumIndex = Math.floor(Math.random() * initialRecords.length);
    setAllRecords([initialRecords[randomAlbumIndex]]);
    searchBar.value = "";
    setResults(0);
    setTotalFetch(24);
  };

  const displayAll = () => {
    setAllRecords(initialRecords);
    setResults(0);
    setTotalFetch(24);
  };

  const allAlbums = "https://newyorker.s3.eu-west-2.amazonaws.com/records.json";
  const skipBy = 24;

  const [allRecords, setAllRecords] = useState<Array<ValidAlbum>>([]);
  const [initialRecords, setInitialRecords] = useState<Array<ValidAlbum>>([]);
  const [display, setDisplay] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("");
  const [totalFetch, setTotalFetch] = useState<number>(24);
  const [results, setResults] = useState<number>(0);

  useEffect(() => {
    setDisplay(allRecords.length - totalFetch);
    setButtonText(`More albums (${display! > 0 ? display : 0})`);
  }, [totalFetch, allRecords, display]);

  return (
    <>
      <div className="searchBox">
        <input
          id="searchBar"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        ></input>
        <button className="displayAll" onClick={displayAll}>
          Display all
        </button>
        <button className="feelingLucky" onClick={feelingLucky}>
          Feeling lucky?
        </button>
      </div>
      {searchBar && searchBar.value.length > 0 && (
        <div className="results">
          {results.toString()} result{results !== 1 ? "s" : null}
        </div>
      )}
      <div className="container" id="cont">
        {allRecords.slice(0, totalFetch).map((card: ValidAlbum) => (
          <Card album={card} key={card.id} />
        ))}{" "}
      </div>
      <div className="buttoncont">
        {display - skipBy > 0 ? (
          <button
            className="morealbums"
            onClick={() => {
              if (display! - skipBy > 0) {
                setDisplay(display! - skipBy);
                setTotalFetch(totalFetch + skipBy);
                setButtonText(`More albums (${display})`);
              } else {
                setTotalFetch(allRecords.length);
              }
            }}
          >
            {buttonText}
          </button>
        ) : null}

        <button
          className="scrollToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to top
        </button>
      </div>
    </>
  );
};
