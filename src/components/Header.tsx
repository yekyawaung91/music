import { useState } from "react";
import { User, Settings, Home, Music, Heart, X, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home size={24} /> },
    { name: "Profile", icon: <User size={24} /> },
    { name: "Library", icon: <Music size={24} /> },
    { name: "Favorites", icon: <Heart size={24} /> },
    { name: "Settings", icon: <Settings size={24} /> },
  ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-purple-900 text-white shadow-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Music2 />𝕐𝕂𝔸 𝕄𝕦𝕚𝕤𝕔
        </h1>
        <img
          src="/user.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-white/30 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
      </header>

      {/* Drawer + Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-0 right-0 w-80 h-full backdrop-blur-md bg-purple-800/80 shadow-2xl z-50 flex flex-col justify-between rounded-l-xl overflow-hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="p-6 flex flex-col gap-6 overflow-y-auto relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X size={20} className="text-white" />
                </button>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-4">
                  <User size={28} className="text-white" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-white">John Doe</span>
                    <span className="text-sm text-white/70">Premium Member</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-3 mt-6">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      className="flex items-center gap-4 p-3 bg-white/10 rounded-xl text-white hover:bg-purple-600/40 hover:backdrop-blur-md font-medium transition-colors duration-200 shadow-sm"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Version Info */}
              <div className="p-6 border-t border-white/20 text-white/50 text-sm text-center">
                Version 1.0.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
