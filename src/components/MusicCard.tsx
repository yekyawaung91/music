import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Eye } from "lucide-react";

type Props = {
  id: number | string;
  image: string;
  title: string;
  artist: string;
  active?: boolean;
  isPlaying?: boolean;
  progress?: number;   // ← NEW
  duration?: number;   // ← NEW
  onPlayPause?: (id: number) => void;
};

export default function MusicCard({
  id,
  image,
  title,
  artist,
  active,
  isPlaying,
  progress = 0,
  duration = 0,
  onPlayPause,
}: Props) {
  const handlePlayPause = (e: any) => {
    e.stopPropagation();
    onPlayPause && onPlayPause(Number(id));
  };

  const gotoDetail = (e: any) => {
    e.stopPropagation();
    window.location.href = `/song/${id}`;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={`flex flex-col cursor-pointer p-1 rounded-xl transition-all ${
        active ? "bg-pink-700/30" : "bg-black/10"
      }`}
      onClick={handlePlayPause} // ← whole card = play/pause
    >
      {/* Album */}
      <motion.div
        className="relative w-full h-36 rounded-xl overflow-hidden"
        whileHover={{ scale: 1.03 }}
      >
        <img
          src={`artworks/${image}`}
          className="w-full h-full object-contain bg-black/20 rounded-xl"
        />

        {/* Hover Play/Pause Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-600/40 rounded-xl"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause size={36} /> : <Play size={36} />}
        </motion.div>

        {/* Active pulsing border */}
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

      {/* Title + View Icon */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-medium truncate text-white">{title}</span>
        <button
          className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-pink-500 transition"
          onClick={gotoDetail}
        >
          <Eye size={16} className="text-white/80" />
        </button>
      </div>

      {/* Artist */}
      <span className="text-xs text-white/70 truncate">{artist}</span>

      {/* Progress Bar */}
      {active && (
        <div className="mt-1 w-full">
          <div className="w-full h-1 bg-white/20 rounded-full">
            <div
              className="h-1 bg-white rounded-full transition-all"
              style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : "0%" }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-white/80">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
