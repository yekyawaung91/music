import { Music, User, Album, ListMusic, Heart } from "lucide-react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Library() {
  const items = [
    {
      label: "Songs",
      icon: <Music size={22} />,
      path: "/library/songs",
      color: "bg-pink-500 text-pink-300",
    },
    {
      label: "Artists",
      icon: <User size={22} />,
      path: "/library/artists",
      color: "bg-purple-500 text-purple-300",
    },
    {
      label: "Albums",
      icon: <Album size={22} />,
      path: "/library/albums",
      color: "bg-blue-500 text-blue-300",
    },
    {
      label: "Playlists",
      icon: <ListMusic size={22} />,
      path: "/library/playlists",
      color: "bg-green-500 text-green-300",
    },
    {
      label: "Favourite",
      icon: <Heart size={22} />,
      path: "/library/favourite",
      color: "bg-red-500 text-red-300",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-32">
      <Header />

      <div className="px-4 mt-6 flex items-center gap-2">
  <ListMusic size={24} className="text-white/90" />
  <h2 className="text-xl font-semibold">Library</h2>
</div>


      <div className="flex flex-col gap-3 px-4 mt-4">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 p-2 rounded-xl bg-purple-800 hover:bg-purple-700 transition-all"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.color}`}
            >
              {item.icon}
            </div>

            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
