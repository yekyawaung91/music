import { useState } from "react";
import { User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    { name: "Profile", icon: <User size={24} /> },
    { name: "Settings", icon: <Settings size={24} /> },
  ];

  // Framer Motion variants
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
      <header className="flex items-center justify-between px-6 py-4 bg-purple-900 text-white shadow-md">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Musicify</h1>

        {/* User Avatar */}
        <img
          src="user.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-white/30 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
      </header>

      {/* Drawer + Overlay with AnimatePresence */}
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
        className="fixed top-0 right-0 w-80 h-[calc(100%-4rem)] bg-white shadow-xl z-50 flex flex-col justify-between rounded-l-lg overflow-hidden"
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <User size={28} className="text-purple-900" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-900">John Doe</span>
              <span className="text-sm text-gray-500">Premium Member</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3 mt-6">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-900 font-medium transition-colors duration-200 shadow-sm"
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="p-6 border-t border-gray-200 text-gray-400 text-sm text-center">
          Version 1.0.0
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>


    </>
  );
}
