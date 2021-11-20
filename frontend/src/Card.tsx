import { FC, useState } from "react";
import { ValidAlbum } from "./App";

export const Card: FC<{ album: ValidAlbum; visible: boolean }> = ({
  album,
  visible,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <span
      className="cardcont"
      style={visible ? { display: "block" } : { display: "none " }}
    >
      <div className="card">
        <div className="card__face card__face--front">
          <img loading="lazy" src={`https://i.scdn.co/image/` + album.art} />
          <p className="withincard">{album.artist}</p>
          <p className="withincard_sub">{album.album}</p>
        </div>
        <div className="card__face card__face--back">
          <div
            style={
              isLoading
                ? {
                    background: "url('src/loader.svg') center center no-repeat",
                  }
                : { background: "none" }
            }
          >
            <iframe
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              src={"https://open.spotify.com/embed/album/" + album.id}
              width="100%"
              height="380px"
              frameBorder="0"
              style={{ backgroundColor: "transparent" }}
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </div>
    </span>
  );
};
