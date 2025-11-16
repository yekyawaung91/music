import { useMemo } from "react";
import { motion } from "framer-motion";
import { ListMusic, Music2 } from "lucide-react"; // Icons
import Header from "../components/Header";
import songsData from "../data/songs.json";

export default function Playlist() {
  // Group songs by playlist
  const playlists = useMemo(() => {
    const map: Record<
      string,
      {
        playlist: string;
        image: string;
        songs: number;
      }
    > = {};

    songsData.forEach((song) => {
      const playlistName = song.playlist || "My Playlist";

      if (!map[playlistName]) {
        map[playlistName] = {
          playlist: playlistName,
          image: song.image, // first song image as playlist cover
          songs: 0,
        };
      }
      map[playlistName].songs += 1;
    });

    return Object.values(map);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      {/* Section Header */}
      <div className="px-4 mt-6 flex items-center gap-2 mb-4">
        <ListMusic size={24} className="text-white" />
        <h2 className="text-xl font-semibold">Playlists</h2>
      </div>

      {/* Playlist Grid */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((pl) => (
          <PlaylistCard key={pl.playlist} playlist={pl} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   UI COMPONENT
---------------------------------------------- */

function PlaylistCard({
  playlist,
}: {
  playlist: {
    playlist: string;
    image: string;
    songs: number;
  };
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-black/10 rounded-xl p-3 cursor-pointer backdrop-blur-sm"
    >
      {/* Playlist Image */}
      <div className="w-full h-32 rounded-xl overflow-hidden bg-black/20 shadow-md">
        <img
          src={`/artworks/${playlist.image}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="font-semibold text-sm truncate">
          {playlist.playlist}
        </h3>

        {/* ✔ 1 ROW INFO (Songs only) */}
        <div className="flex items-center justify-between mt-2 text-[11px] text-white/75">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Music2 size={12} />
            <span>{playlist.songs} Songs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
