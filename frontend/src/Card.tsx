import { FC, useState } from "react";
import { useSpring, a } from "@react-spring/web";
import { ValidAlbum } from "./App";
import svgLoader from "./loader.svg";

const dedupAlbum = (album: string, artist: string) => {
  if (album === artist) {
    return album;
  }
  return `${album} (${artist})`;
};

export const Card: FC<{ album: ValidAlbum }> = ({ album }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 150, friction: 80 },
  });
  const description = dedupAlbum(album.album, album.artist);

  return (
    <span
      className="cardcont"
      onMouseEnter={() => setFlipped((state) => !state)}
      onMouseLeave={() => setFlipped((state) => !state)}
    >
      <div>
        <a.div
          style={{
            transform,
            display: flipped ? "none" : "",
          }}
        >
          <img
            loading="lazy"
            src={`https://i.scdn.co/image/${album.art}`}
            alt={description}
          />
          <p className="withincard">{album.artist}</p>
          <p className="withincard_sub">{album.album}</p>
        </a.div>
        <a.div
          style={{
            transform,
            rotateY: "180deg",
            display: !flipped ? "none" : "",
            background: isLoading
              ? `url('${svgLoader}') center center no-repeat`
              : "none",
          }}
        >
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
        </a.div>
      </div>
    </span>
  );
};
