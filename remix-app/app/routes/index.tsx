import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Modal from "~/components/Modal";
import InfiniteScroller from "~/components/InfiniteScroller";
import LoadingSpinner from "~/components/LoadingSpinner";
import { Transition } from "@headlessui/react";

type Album = {
  album: string;
  id: string;
  artist: string | null;
  art: string;
};

/** Number of images to preload on each scroll */
const PRELOAD = 36;

const isValid = (album: any): boolean => {
  return (
    album.hasOwnProperty("id") &&
    album.hasOwnProperty("art") &&
    album.artist !== null
  );
};

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const page = Number(url.searchParams.get("page")) ?? 0;

  const albums = await fetch(
    "https://newyorker.s3.eu-west-2.amazonaws.com/records.json"
  );
  const json_albums = await albums.json();
  const a = Object.values(json_albums).flat().reverse().filter(isValid);

  const validAlbums = a.slice(page * PRELOAD, page * PRELOAD + PRELOAD);

  return {
    totalAlbums: a.length,
    albums: validAlbums,
    id,
    page,
  };
}

const handleClick = (id: string) => {
  window.history.replaceState(null, "", `/?id=${id}`);
};

const albumExists = (albums: Album[], id: string): boolean => {
  return Boolean(albums.find((al) => al.id == id));
};

export default function Index() {
  const data = useLoaderData() as {
    totalAlbums: number;
    albums: Album[];
    id: string | null;
    page: number;
  };

  const [albumId, setAlbumId] = useState<string | null>(data.id);
  const [isOpen, setIsOpen] = useState(
    albumId !== null && albumExists(data.albums, albumId)
  );
  const [albumsToDisplay, setAlbumsToDisplay] = useState(data.albums);
  const fetcher = useFetcher();
  const handleClose = () => {
    setIsOpen(false);
    window.history.replaceState(null, "", `/`);
  };

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }
    if (fetcher.data) {
      const newAlbums = fetcher.data.albums;
      setAlbumsToDisplay((oldAlbums) => [...oldAlbums, ...newAlbums]);
    }
  }, [fetcher.data]);

  const loadNext = () => {
    const page = fetcher.data ? fetcher.data.page + 1 : data.page + 1;
    const query = `?index&page=${page}`;
    fetcher.load(query);
  };

  const TOTAL_PAGES = Math.floor(data.totalAlbums / PRELOAD);

  return (
    <InfiniteScroller loadNext={loadNext} loading={fetcher.state === "loading"}>
      <div
        className="grid grid-cols-fill-16 bg-neutral-100 overflow-y-scroll place-items-center items-center"
        key="albums"
      >
        {isOpen && albumId && (
          <Modal id={albumId} isOpen={isOpen} onClose={handleClose} />
        )}
        <>
          {" "}
          <div className="w-auto h-auto p-4 font-mono">
            An archive of the{" "}
            <span className="underline">
              <Link to="https://www.newyorker.com/goings-on-about-town/night-life">
                New Yorker's Jazz, Rock, and Pop music recommendations
              </Link>
            </span>{" "}
            scraped by a Lambda function that has been running on AWS since
            September 2020.
            <Link to="https://ko-fi.com/G2G58QFRM" target="_blank">
              <img
                className=" border-0 h-[36px] mt-4"
                src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </Link>
          </div>
          {albumsToDisplay.map((album) => {
            return (
              <>
                <div
                  className="cursor-zoom-in w-auto h-auto"
                  key={album.id}
                  onClick={() => {
                    setIsOpen(true);
                    setAlbumId(album.id);
                    handleClick(album.id);
                  }}
                >
                  <Transition
                    show={true}
                    appear={true}
                    enter="transition ease duration-1000 transform"
                    enterFrom="opacity-0 ease-in"
                    enterTo="opacity-100"
                  >
                    <img
                      width="300px"
                      height="300px"
                      src={`https://i.scdn.co/image/${album.art}`}
                      alt={`${album.artist}: ${album.album}`}
                      key={`img-${album.id}`}
                    />
                  </Transition>
                </div>
              </>
            );
          })}
          {fetcher.state === "loading" &&
            (fetcher.data?.page <= TOTAL_PAGES ||
              typeof fetcher.data?.page === "undefined") && (
              <div className="w-auto h-auto">
                <LoadingSpinner />
              </div>
            )}
          {TOTAL_PAGES <= fetcher.data?.page && (
            <Link to="#top">
              <div className="w-auto h-auto p-4 font-mono text-center m-auto">
                {" "}
                The end.
                <br />↑
              </div>
            </Link>
          )}
        </>
      </div>
    </InfiniteScroller>
  );
}
