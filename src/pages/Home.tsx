import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import MusicCard from "../components/MusicCard";
import type { Song } from "../types/song";
import songsData from "../data/songs.json";

export default function Home() {
  const songs: Song[] = songsData;

  // Recently Added - order by id desc, take 3
  const recentlyAdded = [...songs]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  // Recommended - pick 3 random songs
  const recommended = songs
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-20">
      <Header />
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search music..."
          className="w-full px-4 py-2 rounded-full bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <SectionTitle title="Recently Added" action="See all" />
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 px-4 py-2">
        {recentlyAdded.map((song) => (
          <MusicCard key={song.id} {...song} />
        ))}
      </div>

      <SectionTitle title="Recommended" action="More" />
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 px-4 py-2">
        {recommended.map((song) => (
          <MusicCard key={song.id} {...song} />
        ))}
      </div>
    </div>
  );
}
