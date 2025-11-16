import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Eye } from "lucide-react";
import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import type { Song } from "../types/song";
import songsData from "../data/songs.json";

export default function Home() {
  const songs: Song[] = songsData;

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Shuffle recommended songs once on page load (exclude top 3 Recently Added)
useEffect(() => {
  // Get top 3 recently added by id desc
  const top3 = songs
    .sort((a, b) => b.id - a.id)
    .slice(0, 2)
    .map(s => s.id);

  // Filter out top 3 from songs
  const remainingSongs = songs.filter(s => !top3.includes(s.id));

  // Shuffle remaining songs and take 3
  const shuffled = remainingSongs.sort(() => 0.5 - Math.random()).slice(0, 2);

  setRecommendedSongs(shuffled);
}, []);


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
    return (
      <div className="mt-1 w-full">
        <div className="w-full h-1 bg-white/20 rounded-full">
          <div
            className="h-1 bg-white rounded-full"
            style={{ width: active ? `${(progress / duration) * 100}%` : "0%" }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>{active ? formatTime(progress) : "0:00"}</span>
          <span>{active ? formatTime(duration) : ""}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-20">
      <Header />

      {/* Search */}
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search music..."
          className="w-full px-4 py-2 rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      {/* Recently Added */}
      <SectionTitle title="Recently Added" action="See all" />
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs
          .sort((a, b) => b.id - a.id)
          .slice(0, 2)
          .map((song) => {
            const active = currentSong?.audio === song.audio && isPlaying;
            return (
              <div
                key={song.id}
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
                    src={`/artworks/${song.image}`}
                    className="w-full h-full object-cover bg-black/20 rounded-xl"
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

                  <a
                    href={`/song/${song.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-pink-500 transition-colors"
                  >
                    <Eye size={18} className="text-white/80 hover:text-white" />
                  </a>
                </div>

                <span className="text-xs text-white/70 truncate">{song.artist}</span>

                {renderProgress(song)}
              </div>
            );
          })}
      </div>

      {/* Recommended */}
      <SectionTitle title="Recommended" action="More" />
      <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedSongs.map((song) => {
          const active = currentSong?.audio === song.audio && isPlaying;
          return (
            <div
              key={song.id}
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
                  src={`/artworks/${song.image}`}
                  className="w-full h-full object-cover bg-black/20 rounded-xl"
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

                <a
                  href={`/song/${song.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-pink-500 transition-colors"
                >
                  <Eye size={18} className="text-white/80 hover:text-white" />
                </a>
              </div>

              <span className="text-xs text-white/70 truncate">{song.artist}</span>

              {renderProgress(song)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
