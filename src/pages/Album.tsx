import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Music2, Disc3 } from "lucide-react";
import Header from "../components/Header";
import songsData from "../data/songs.json";

export default function Album() {
  // Group songs by album
  const albums = useMemo(() => {
    const map: Record<
      string,
      {
        album: string;
        image: string;
        artist: string;
        released: number;
        songs: number;
      }
    > = {};

    songsData.forEach((song) => {
      if (!map[song.album]) {
        map[song.album] = {
          album: song.album,
          image: song.image,
          artist: song.artist,
          released: song.released,
          songs: 0,
        };
      }
      map[song.album].songs += 1;
    });

    return Object.values(map);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      {/* Section Header */}
      <div className="px-4 mt-6 flex items-center gap-2 mb-4">
        <Disc3 size={24} className="text-white" />
        <h2 className="text-xl font-semibold">Albums</h2>
      </div>

      {/* Album Grid */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album.album} album={album} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   UI COMPONENTS
---------------------------------------------- */

function AlbumCard({
  album,
}: {
  album: {
    album: string;
    image: string;
    artist: string;
    released: number;
    songs: number;
  };
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-black/10 rounded-xl p-3 cursor-pointer backdrop-blur-sm"
    >
      {/* Album Cover */}
      <div className="w-full h-32 rounded-xl overflow-hidden bg-black/20 shadow-md">
        <img
          src={`/artworks/${album.image}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="font-semibold text-sm truncate">{album.album}</h3>

        {/* Artist */}
        <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
          <Music2 size={14} />
          <span>{album.artist}</span>
        </div>

        {/* ✔ 1 ROW INFO */}
      <div className="flex items-center justify-between mt-2 text-[11px] text-white/75">
        
        {/* Total Songs */}
        <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
          <Disc3 size={14} />
          <span>{album.songs} Songs</span>
        </div>

        {/* Released Date */}
        <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
          <Calendar size={14} />
          <span>{album.released}</span>
        </div>
      </div>

        
      </div>
    </motion.div>
  );
}
