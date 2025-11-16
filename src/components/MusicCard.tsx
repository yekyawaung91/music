import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  image: string;
  title: string;
  artist: string;
  active?: boolean;
  onClick?: () => void;
};

export default function MusicCard({ image, title, artist, active, onClick }: Props) {
  return (
    <div
      className={`flex flex-col cursor-pointer p-1 rounded-xl transition-all ${
        active ? "bg-pink-700/30" : "bg-black/10"
      }`}
      onClick={onClick}
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

        {/* Hover / Active Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-600/40 rounded-xl"
        >
          {active ? <Pause size={36} /> : <Play size={36} />}
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
        <span className="text-sm font-medium truncate text-white">
          {title}
        </span>

        <Link
          to={`/song/${title}`}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-pink-500 transition"
        >
          <Eye size={16} className="text-white/80" />
        </Link>
      </div>

      {/* Artist */}
      <span className="text-xs text-white/70 truncate">
        {artist}
      </span>
    </div>
  );
}
