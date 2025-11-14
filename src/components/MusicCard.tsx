import { motion } from "framer-motion";
import { Play } from "lucide-react";

type Props = {
  image: string;
  title: string;
  artist: string;
};

export default function MusicCard({ image, title, artist }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative flex flex-col w-36 cursor-pointer"
    >
      {/* Album Image */}
      <div className="relative w-36 h-36 rounded-2xl overflow-hidden shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Play Icon Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-400/30"
        >
          <Play size={40} className="text-white" />
        </motion.div>
      </div>

      {/* Song Info */}
      <span className="mt-2 text-sm font-medium text-purple-900 truncate">{title}</span>
      <span className="text-xs text-blue-900">{artist}</span>
    </motion.div>
  );
}
