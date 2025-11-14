import { useState, useRef } from "react";
import { Grid, List, Play, Pause, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import type { Song } from "../types/song";
import songsData from "../data/songs.json";

export default function Explore() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songs: Song[] = songsData;

  const togglePlay = (song: Song) => {
    if (currentSong?.audio === song.audio) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } else {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(song.audio);
      audioRef.current = audio;
      audio.play();
      setCurrentSong(song);
      setIsPlaying(true);

      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("timeupdate", () => setProgress(audio.currentTime));
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderProgress = (song: Song) => {
    const active = currentSong?.audio === song.audio && isPlaying;
    return active ? (
      <div className="mt-1 w-full">
        <div className="w-full h-1 bg-white/20 rounded-full">
          <div
            className="h-1 bg-white rounded-full"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    ) : (
      <div className="mt-1 w-full">
        <div className="w-full h-1  rounded-full">
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>0:00</span>
          <span></span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      {/* Search */}
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
            className={`p-2 rounded-lg ${view === "grid" ? "bg-white/30" : "bg-white/10"}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg ${view === "list" ? "bg-white/30" : "bg-white/10"}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
{view === "grid" && (
  <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {songs.map((song) => {
      const active = currentSong?.audio === song.audio && isPlaying;
      return (
        <div
          key={song.title}
          className={`flex flex-col cursor-pointer p-1 rounded-xl ${
            active ? "bg-pink-700/30" : "bg-black/10"
          }`}
          onClick={() => togglePlay(song)}
        >
          <motion.div
            className="relative w-full h-36 rounded-xl overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={song.image}
              className="w-full h-full object-contain bg-black/20 rounded-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center bg-purple-600/40 rounded-xl"
            >
              {active ? <Pause size={36} /> : <Play size={36} />}
            </motion.div>

            <AnimatePresence>
              {active && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-white/30"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium truncate">{song.title}</span>

            <Link
              to={`/song/${song.id}`}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-pink-500 transition-colors"
            >
              <Eye size={18} className="text-white/80 hover:text-white" />
            </Link>
          </div>
          <span className="text-xs text-white/70 truncate block">{song.artist}</span>

          {renderProgress(song)}
        </div>
      );
    })}
  </div>
)}


      {/* LIST VIEW */}
    {view === "list" && (
  <div className="px-4 flex flex-col gap-4">
    {songs.map((song) => {
      const active = currentSong?.audio === song.audio && isPlaying;
      return (
        <div
          key={song.title}
          className={`flex flex-col gap-2 cursor-pointer p-2 rounded-xl ${
            active ? "bg-pink-700/30" : "bg-black/10"
          }`}
          onClick={() => togglePlay(song)}
        >
          <div className="flex items-center gap-3 w-full">
            <motion.div
              className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={song.image}
                className="w-full h-full object-contain rounded-xl bg-black/20"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center bg-purple-600/40 rounded-xl"
              >
                {active ? <Pause size={26} /> : <Play size={26} />}
              </motion.div>

              <AnimatePresence>
                {active && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-white/30"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex flex-col w-full">
              <span className="font-medium text-sm truncate">{song.title}</span>
              <span className="text-xs text-white/70 truncate">{song.artist}</span>

              {/* Progress bar & time under artist */}
              {renderProgress(song)}
            </div>
          </div>
        </div>
      );
    })}
  </div>
)}


    </div>
  );
}
