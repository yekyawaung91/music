import { useState, useRef } from "react";
import { Play, Pause, MessageSquare, Heart, MicVocal } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import type { Song } from "../types/song";
import songsData from "../data/songs.json";

export default function Karaoke() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setProgress] = useState(0);
  const [, setDuration] = useState(0);
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

  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search karaoke songs..."
          className="w-full px-4 py-2 rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <h2 className="text-xl font-semibold px-4 mt-6 mb-4">Karaoke</h2>

      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => {
          const active = currentSong?.audio === song.audio && isPlaying;
          return (
            <div
              key={song.title}
              className={`flex flex-col p-4 rounded-xl cursor-pointer bg-black/10 hover:bg-pink-700/20 transition-colors`}
              onClick={() => togglePlay(song)}
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-black/20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={song.image}
                    className="w-full h-full object-cover"
                    alt={song.title}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: active ? 1 : 0 }}
                  >
                    {active ? <Pause size={28} /> : <Play size={28} />}
                  </motion.div>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold text-sm truncate">{song.title}</span>
                  <span className="text-xs text-white/70 truncate">{song.artist}</span>
                </div>
              </div>

              {/* Karaoke Stats */}
              <div className="flex justify-between mt-3 text-xs text-white/70">
                <div className="flex items-center gap-1">
                <MicVocal size={14} className="text-white/60" />
                  <span>12</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-white/60" />
                  <span>5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-400" />
                  <span>20</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
