    import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import MusicCard from "../components/MusicCard";

const songs = [
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    title: "What I've Done What I've Done",
    artist: "DJ Nova",
  },
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    title: "Ocean Breeze",
    artist: "WaveFlow",
  },
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    title: "Golden Hour",
    artist: "Aura Beats",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <Header />
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search music..."
          className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <SectionTitle title="Recently Played" action="See all" />
      <div className="flex gap-4 px-4 py-2 overflow-x-auto no-scrollbar">
        {songs.map((song) => (
          <MusicCard key={song.title} {...song} />
        ))}
      </div>

      <SectionTitle title="Recommended" action="More" />
      <div className="flex gap-4 px-4 py-2 overflow-x-auto no-scrollbar">
        {songs.map((song) => (
          <MusicCard key={song.title} {...song} />
        ))}
      </div>
    </div>
  );
}
