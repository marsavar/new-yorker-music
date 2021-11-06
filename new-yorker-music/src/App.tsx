import "./App.css";
import { Header } from "./Header";
import { MainBody } from "./MainBody";

export type Album = {
  album: string;
};

export type ValidAlbum = Album & {
  id: string;
  art: string;
  artist: string;
};

function App() {
  return (
    <>
      <Header />
      <MainBody />
    </>
  );
}

export default App;
