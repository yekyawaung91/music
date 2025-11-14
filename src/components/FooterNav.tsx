import { motion } from "framer-motion";
import { Home, Compass, Library, Search } from "lucide-react";

type Tab = {
  name: string;
  icon: React.ReactNode;
};

export default function FooterNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  const tabs: Tab[] = [
    { name: "Home", icon: <Home size={22} /> },
    { name: "Explore", icon: <Compass size={22} /> },
    { name: "Library", icon: <Library size={22} /> },
    { name: "Search", icon: <Search size={22} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-purple-900 shadow-inner z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center text-white"
            >
              <motion.div
                animate={{ y: isActive ? -3 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={isActive ? "font-bold text-pink-600" : "font-normal"}
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
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
