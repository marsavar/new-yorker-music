import { CSSProperties, FC, useState } from "react";
import { ValidAlbum } from "./App";
import svgLoader from "./loader.svg";

const dedupAlbum = (album: string, artist: string): string => {
  if (album === artist) {
    return album;
  }
  return `${album} (${artist})`;
};

const isLoadingStyle = (isLoading: boolean): CSSProperties => {
  if (isLoading) {
    return {
      background: `url('${svgLoader}') center center no-repeat`,
    };
  }
  return { background: "none" };
};

export const Card: FC<{ album: ValidAlbum }> = ({ album }) => {
  const [isLoading, setIsLoading] = useState(true);

  const description = dedupAlbum(album.album, album.artist);

  return (
    <span className="cardcont">
      <div className="card">
        <div className="card__face card__face--front">
          <img
            loading="lazy"
            src={`https://i.scdn.co/image/${album.art}`}
            alt={description}
          />
          <p className="withincard">{album.artist}</p>
          <p className="withincard_sub">{album.album}</p>
        </div>
        <div className="card__face card__face--back">
          <div style={isLoadingStyle(isLoading)}>
            <iframe
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              src={`https://open.spotify.com/embed/album/${album.id}`}
              width="100%"
              height="380px"
              frameBorder="0"
              style={{ backgroundColor: "transparent" }}
              allow="encrypted-media"
              title={description}
            />
          </div>
        </div>
      </div>
    </span>
  );
};
