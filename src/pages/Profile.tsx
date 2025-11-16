import { Settings, LogOut } from "lucide-react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Profile() {
  const menuItems = [

    {
      label: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
      color: "bg-yellow-500 text-yellow-300",
    },
    {
      label: "Logout",
      icon: <LogOut size={22} />,
      path: "/logout",
      color: "bg-gray-500 text-gray-300",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-32">
      <Header />

      {/* Profile Header */}
      <div className="px-4 mt-6 flex items-center gap-4">
        <img
          src="/user.png"
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white/30"
        />
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Ye Kyaw Aung</span>
          <span className="text-white/70 text-sm">Premium Member</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between px-4 mt-6">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">120</span>
          <span className="text-white/70 text-sm">Songs</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">32</span>
          <span className="text-white/70 text-sm">Albums</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">15</span>
          <span className="text-white/70 text-sm">Playlists</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 px-4 mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 p-3 rounded-xl bg-purple-800 hover:bg-purple-700 transition-all shadow-md"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
