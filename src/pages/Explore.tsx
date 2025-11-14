import { useState } from "react";
import { Grid, List, Play } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";

type Song = {
  image: string; // Google Drive image URL
  title: string;
  artist: string;
  audio: string; // Google Drive mp3 URL
};

const songs: Song[] = [
  {
    image: "https://drive.google.com/uc?export=download&id=YOUR_IMAGE_FILE_ID",
    title: "What I've Done",
    artist: "DJ Nova",
    audio: "https://drive.google.com/uc?export=download&id=1NEcES7khwuFsYh4r7aGWYqARCkwfq9DM",
  },
  {
    image: "https://drive.google.com/uc?export=download&id=YOUR_IMAGE_FILE_ID_2",
    title: "Ocean Breeze",
    artist: "WaveFlow",
    audio: "https://drive.google.com/uc?export=download&id=YOUR_MP3_FILE_ID_2",
  },
  {
    image: "https://drive.google.com/uc?export=download&id=YOUR_IMAGE_FILE_ID_3",
    title: "Golden Hour",
    artist: "Aura Beats",
    audio: "https://drive.google.com/uc?export=download&id=YOUR_MP3_FILE_ID_3",
  },
];

export default function Explore() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const playSong = (audioUrl: string) => {
    // Stop previous audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-600 text-white pb-20">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search music..."
          className="w-full px-4 py-2 rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mt-6 mb-4">
        <h2 className="text-lg font-semibold">Explore</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg ${
              view === "grid" ? "bg-white/30" : "bg-white/10"
            }`}
          >
            <Grid size={20} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg ${
              view === "list" ? "bg-white/30" : "bg-white/10"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="px-4 grid grid-cols-2 gap-4">
          {songs.map((song) => (
            <div
              key={song.title}
              className="flex flex-col cursor-pointer"
              onClick={() => playSong(song.audio)}
            >
              {/* Image with hover overlay */}
              <motion.div
                className="relative w-full h-36 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <img src={song.image} className="w-full h-full object-cover" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl"
                >
                  <Play size={36} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Song Info */}
              <span className="mt-2 text-sm font-medium truncate block">
                {song.title}
              </span>
              <span className="text-xs text-white/70 truncate block">
                {song.artist}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="px-4 flex flex-col gap-4">
          {songs.map((song) => (
            <div
              key={song.title}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => playSong(song.audio)}
            >
              <motion.div
                className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                whileHover={{ scale: 1.03 }}
              >
                <img src={song.image} className="w-full h-full object-cover" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl"
                >
                  <Play size={26} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Info */}
              <div className="flex flex-col">
                <span className="font-medium text-sm truncate w-40">
                  {song.title}
                </span>
                <span className="text-xs text-white/70 truncate w-40">
                  {song.artist}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
