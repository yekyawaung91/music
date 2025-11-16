import { useMemo } from "react";
import { motion } from "framer-motion";
import { Disc3, Music2 } from "lucide-react";
import Header from "../components/Header";
import songsData from "../data/songs.json";

export default function Artist() {
  // Group songs by artist
  const artists = useMemo(() => {
    const map: Record<
      string,
      { artist: string; image: string; albums: Set<string>; songs: number }
    > = {};

    songsData.forEach((song) => {
      if (!map[song.artist]) {
        map[song.artist] = {
          artist: song.artist,
          image: song.image,
          albums: new Set(),
          songs: 0,
        };
      }
      map[song.artist].albums.add(song.album || "Unknown Album");
      map[song.artist].songs += 1;
    });

    return Object.values(map);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      {/* Section Header */}
      <div className="px-4 mt-6 flex items-center gap-2 mb-4">
        <Music2 size={24} className="text-white" />
        <h2 className="text-xl font-semibold">Artists</h2>
      </div>

      {/* Grid View Only */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <motion.div
            key={artist.artist}
            whileHover={{ scale: 1.03 }}
            className="bg-black/10 rounded-xl p-3 cursor-pointer"
          >
            <div className="w-full h-32 rounded-xl overflow-hidden bg-black/20">
              <img
                src={`/artworks/${artist.image}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-sm truncate">{artist.artist}</h3>

              <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                <Disc3 size={14} />
                <span>{artist.albums.size} Albums</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                <Music2 size={14} />
                <span>{artist.songs} Songs</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
