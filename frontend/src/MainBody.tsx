import { FC, useEffect, useState } from "react";
import { ValidAlbum } from "./App";
import { Card } from "./Card";
export const isValid = (album: any): boolean => {
  return (
    album.hasOwnProperty("id") &&
    album.hasOwnProperty("art") &&
    album["artist"] != null
  );
};

export const MainBody: FC = () => {
  window.onload = async () => {
    const getAlbums = await fetch(allAlbums);
    const json = await getAlbums.json();
    const validAlbums: ValidAlbum[] = Object.values(json)
      .flat()
      .reverse()
      .filter(isValid)
      .map((a: any) => ({
        album: a.album,
        id: a.id,
        artist: a.artist,
        art: a.art,
      }));
    setAllRecords(validAlbums);
    setInitialRecords(validAlbums);
  };

  const handleChange = (val: string) => {
    if (val.length > 0) {
      const findAlbums = initialRecords.filter(
        (a) =>
          a.album.toLowerCase().includes(val.toLowerCase()) ||
          a.artist.toLowerCase().includes(val.toLowerCase())
      );
      setAllRecords(findAlbums);
      const numberOfAlbumsFound = findAlbums.length;
      setDisabled(numberOfAlbumsFound <= totalFetch);
      setResults(numberOfAlbumsFound);
    } else {
      setAllRecords(initialRecords);
      setResults(0);
    }
  };

  const feelingLucky = () => {
    const randomAlbumIndex = Math.floor((Math.random() * initialRecords.length));
    setAllRecords([initialRecords[randomAlbumIndex]])
    setResults(0);
    setDisabled(true);
  }

  const displayAll = () => {
    setAllRecords(initialRecords)
    setDisabled(false);
  }

  const allAlbums = "https://newyorker.s3.eu-west-2.amazonaws.com/records.json";
  const skipBy = 12;

  const [allRecords, setAllRecords] = useState<Array<ValidAlbum>>([]);
  const [initialRecords, setInitialRecords] = useState<Array<ValidAlbum>>([]);
  const [display, setDisplay] = useState<number>();
  const [buttonText, setButtonText] = useState<string>();
  const [firstDisplay, setFirstDisplay] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [totalFetch, setTotalFetch] = useState<number>(24);
  const [results, setResults] = useState<number>(0);

  useEffect(() => {
    const maybeAlbums = async () => {
      setFirstDisplay(allRecords.length - totalFetch);
      setDisplay(allRecords.length - totalFetch);
      setButtonText(`More albums (${firstDisplay! > 0 ? firstDisplay : 0})`);
    };

    maybeAlbums();
  }, [firstDisplay, totalFetch, allRecords, display, buttonText]);

  return (
    <>
      <input
        id="searchBox"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleChange(e.target.value)}
      ></input><button className="feelingLucky" onClick={feelingLucky}>Feeling lucky?</button>
      <button className="displayAll" onClick={displayAll}>Display all</button>
      {results > 0 && (
        <div className="results">
          {results.toString()} result{results > 1 ? "s" : null}
        </div>
      )}
      <div className="container" id="cont">
        {allRecords.slice(0, totalFetch).map((card: ValidAlbum) => (
          <Card album={card} key={card.id} />
        ))}{" "}
      </div>
      <div className="buttoncont">
        <button
          className="morealbums"
          disabled={disabled}
          onClick={() => {
            if (display! - skipBy > 0) {
              setDisplay(display! - skipBy);
              setTotalFetch(totalFetch + skipBy);
              setButtonText(`More albums (${display})`);
            } else {
              setTotalFetch(allRecords.length);
              setDisabled(true);
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};
