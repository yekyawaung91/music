import { motion } from "framer-motion";
import { Home, Compass, ListMusic, MicVocal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type Tab = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

export default function FooterNav() {
  const location = useLocation();

  const tabs: Tab[] = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Explore", icon: <Compass size={22} />, path: "/explore" },
    { name: "Library", icon: <ListMusic size={22} />, path: "/library" },
    { name: "Karaoke", icon: <MicVocal size={22} />, path: "/karaoke" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-purple-900 shadow-inner z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
  // Library ကို subpath တွေပါ active လုပ်
  const isActive =
    tab.path === "/library"
      ? location.pathname.startsWith("/library")
      : location.pathname === tab.path;

  return (
    <Link
      key={tab.name}
      to={tab.path}
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ y: isActive ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={isActive ? "font-bold text-pink-600" : "font-normal text-white"}
      >
        {tab.icon}
      </motion.div>

      <motion.span
        className={`text-xs mt-1 ${
          isActive ? "font-bold text-pink-600" : "text-white/70"
        }`}
      >
        {tab.name}
      </motion.span>
    </Link>
  );
})}

      </div>
    </nav>
  );
}
