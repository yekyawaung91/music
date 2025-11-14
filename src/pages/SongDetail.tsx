import { useParams } from "react-router-dom";
import Header from "../components/Header";
import songs from "../data/songs.json";
import { useEffect, useRef, useState } from "react";
import { Heart, Clock, Play, Pause } from "lucide-react";

type LyricLine = {
  time: number;
  text: string;
};

export default function SongDetail() {
  const { id } = useParams();
  const song = songs.find((s) => s.id === Number(id));
  const [lyricsLines, setLyricsLines] = useState<LyricLine[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    if (!song) return;

    const audio = new Audio(song.audio);
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  // Fetch lyrics & parse
  // Fetch lyrics & parse
useEffect(() => {
  if (!song?.lyrics) return;

  fetch(`/src/data/${song.lyrics}`)
    .then((res) => res.text())
    .then((t) => {
      // Parse lyrics lines
      const lines: LyricLine[] = t
        .split("\n")
        .map((line) => {
          const match = line.match(/\[(\d+):(\d+)\]\s*(.*)/);
          if (!match) return null;
          const minutes = parseInt(match[1]);
          const seconds = parseInt(match[2]);
          return { time: minutes * 60 + seconds, text: match[3] };
        })
        .filter(Boolean) as LyricLine[];

      setLyricsLines(lines);
    })
    .catch(() => setLyricsLines([{ time: 0, text: "Lyrics not available." }]));
}, [song]);


  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Song not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      <div className="mx-auto px-6 py-6">
        <div className="flex gap-4 items-start">
  {/* Artwork 40% */}
  <div className="flex-shrink-0 w-[35%]">
    <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-xl">
      <img
        src={song.image}
        alt={song.title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Song Info 60% */}
  <div className="flex flex-col gap-1 w-[65%]">
    <h1 className="text-xl font-bold">{song.title}</h1>
    <p className="text-md text-slate-200">{song.artist}</p>
    <p className="flex items-center gap-2 text-slate-200">
      <Clock size={18} className="text-slate-200" />
      {formatTime(duration)}
    </p>

    {/* Play + Favorite */}
    <div className="flex gap-2 mt-2">
      <button
        onClick={togglePlay}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700">
        <Heart size={16} />
        Favorite
      </button>
    </div>

    {/* Progress Bar */}
    <div className="mt-2 w-full">
      <div className="w-full h-1 bg-black/20 rounded-full">
        <div
          className="h-1 bg-white rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-white mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  </div>
</div>


        {/* Lyrics */}
        <div className="mt-6 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md max-h-[600px] overflow-y-auto">
          <h2 className="text-md font-semibold text-purple-600 mb-4">Lyrics</h2>

          <div className="space-y-1 text-sm">
            {lyricsLines.map((line, idx) => {
              const isActive = currentTime >= line.time && (idx === lyricsLines.length - 1 || currentTime < lyricsLines[idx + 1].time);
              return (
                <p
                  key={idx}
                  className={`transition-colors duration-200 ${isActive ? "bg-purple-400/30 text-purple-900 rounded px-1" : "text-gray-700 px-1"}`}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
