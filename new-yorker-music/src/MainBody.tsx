import { FC, useEffect, useState } from "react";
import { Album, ValidAlbum } from "./App";
import { Card } from "./Card";
const isValid = (album: any): boolean => {
  return (
    album.hasOwnProperty("id") &&
    album.hasOwnProperty("art") &&
    album["artist"] != null
  );
};

export const MainBody: FC = () => {
  const allAlbums = "https://newyorker.s3.eu-west-2.amazonaws.com/records.json";
  const skipBy = 12;

  const [allRecords, setAllRecords] = useState<Array<ValidAlbum>>([]);
  const [display, setDisplay] = useState<number>();
  const [buttonText, setButtonText] = useState<string>();
  const [firstDisplay, setFirstDisplay] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [totalFetch, setTotalFetch] = useState<number>(24);

  const validAlbums: ValidAlbum[] = [];
  useEffect(() => {
    const maybeAlbums = async () => {
      const response = await fetch(allAlbums);
      const jsonResponse = await response.json();
      Object.keys(jsonResponse).forEach((key) => {
        jsonResponse[key].forEach((album: Album) => {
          if (isValid(album)) {
            validAlbums.unshift(album as ValidAlbum);
          }
        });
      });
      setAllRecords(validAlbums);
      setFirstDisplay(allRecords.length - totalFetch);
      setDisplay(allRecords.length - totalFetch);
      setButtonText(`More albums (${firstDisplay})`);
    };

    maybeAlbums();
  }, [firstDisplay, totalFetch]);

  return (
    <>
      <div className="container" id="cont">
        {allRecords.slice(0, totalFetch).map((card: ValidAlbum) => (
          <Card album={card} visible={true} />
        ))}{" "}
      </div>
      <div className="buttoncont">
        <button
          className="morealbums"
          disabled={disabled}
          onClick={() => {
            if (display! - skipBy >= 0) {
              setDisplay(display! - skipBy);
              setTotalFetch(totalFetch + skipBy);
              setButtonText(`More albums (${display})`);
            } else {
              setTotalFetch(allRecords.length);
              setButtonText(`No more albums :(`);
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
