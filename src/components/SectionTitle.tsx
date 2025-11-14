import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  action?: string;
  onActionClick?: () => void;
};

export default function SectionTitle({ title, action, onActionClick }: Props) {
  return (
    <div className="flex justify-between items-center px-4 mt-6 mb-2">
      {/* Gradient Title */}
      <h2 className="text-lg font-bold text-gray-200 bg-clip-text">
        {title}
      </h2>

      {/* Action Button */}
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onActionClick}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-600 text-white rounded-full shadow-sm hover:bg-purple-800 transition-colors duration-200"
        >
          <ArrowRight size={14} />
          {action}
        </motion.button>
      )}
    </div>
  );
}
