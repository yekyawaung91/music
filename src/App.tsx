import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SongDetail from "./pages/SongDetail"; // song detail page
import Library from "./pages/Library";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Playlist from "./pages/Playlist";
import Favourite from "./pages/Favourite";
import Song from "./pages/Song";
import Profile from "./pages/Profile";
import Karaoke from "./pages/Karaoke";
import FooterNav from "./components/FooterNav";
import KaraokeRecorder from "./pages/KaraokeRecorder";
export default function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        {/* Routes for pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/songs" element={<Song />} />
          <Route path="/library/artists" element={<Artist />} />
          <Route path="/library/playlists" element={<Playlist />} />
          <Route path="/library/favourite" element={<Favourite />} />
          <Route path="/library/albums" element={<Album />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/karaoke" element={<Karaoke />} />
          <Route path="/sing/:id" element={<KaraokeRecorder />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>

        {/* Footer Navigation */}
        <FooterNav  />
      </div>
    </BrowserRouter>
  );
}
