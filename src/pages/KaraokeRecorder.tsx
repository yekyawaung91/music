import { useParams } from "react-router-dom";
import Header from "../components/Header";
import songs from "../data/karaoke.json";
import { useEffect, useRef, useState } from "react";
import {
  Album,
  MicOff,
  Download,
  PlayCircle,
  MicVocal,
} from "lucide-react";

type LyricLine = {
  time: number;
  text: string;
};

export default function SongDetail() {
  const { id } = useParams();
  const song = songs.find((s) => s.id === Number(id));
  const [lyricsLines, setLyricsLines] = useState<LyricLine[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  // ----------------------------------
  // 🎤 RECORDING SYSTEM (MIC + SONG)
  // ----------------------------------
  const audioCtxRef = useRef<AudioContext | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const ensureAudioContext = async () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new Ctx();
    }
  };

  const startRecording = async () => {
    await ensureAudioContext();
    if (!audioRef.current) return;

    const audio = audioRef.current;

    try {
      // Microphone Stream
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = micStream;

      const audioCtx = audioCtxRef.current!;
      const micSource = audioCtx.createMediaStreamSource(micStream);

      // Song Source
      const trackSource = audioCtx.createMediaElementSource(audio);

      const micGain = audioCtx.createGain();
      const trackGain = audioCtx.createGain();

      micGain.gain.value = 1;
      trackGain.gain.value = 1;

      const dest = audioCtx.createMediaStreamDestination();
      destinationRef.current = dest;

      micSource.connect(micGain).connect(dest);
      trackSource.connect(trackGain).connect(dest);

      // Speaker Output
      trackSource.connect(audioCtx.destination);

      const recorder = new MediaRecorder(dest.stream, { mimeType: "audio/webm" });

      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current = recorder;
      recorder.start(500);

      // ⭐ AUTO PLAY SONG WHEN RECORD STARTS
      audio.play();

      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    micStreamRef.current?.getTracks().forEach((x) => x.stop());

    // ⭐ STOP SONG ALSO
    audioRef.current?.pause();

    setIsRecording(false);
  };

  // ----------------------------------
  // SONG LOAD + TIME UPDATE
  // ----------------------------------
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

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  // ----------------------------------
  // LYRICS FETCH
  // ----------------------------------
  useEffect(() => {
    if (!song?.lyrics) return;

    fetch(`/lyrics/${song.lyrics}`)
      .then((res) => res.text())
      .then((t) => {
        const lines: LyricLine[] = t
          .split("\n")
          .map((line) => {
            const match = line.match(/\[(\d+):(\d+)\]\s*(.*)/);
            if (!match) return null;
            return {
              time: parseInt(match[1]) * 60 + parseInt(match[2]),
              text: match[3],
            };
          })
          .filter(Boolean) as LyricLine[];

        setLyricsLines(lines);
      })
      .catch(() =>
        setLyricsLines([{ time: 0, text: "Lyrics not available." }])
      );
  }, [song]);

  // ----------------------------------
  // RENDER
  // ----------------------------------
  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Song not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-400 to-violet-500 text-white pb-28">
      <Header />

      <div className="mx-auto px-6 py-6">
        <div className="flex gap-4 items-start">
          {/* Artwork */}
          <div className="shrink-0 w-[35%]">
            <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img
                src={`/artworks/${song.image}`}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 w-[65%]">
            <h1 className="text-xl font-bold">{song.title}</h1>
            <p className="text-md text-amber-300">{song.artist}</p>

            <p className="flex items-center gap-2 text-sm text-slate-200">
              <Album size={16} />
              {song.album}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white"
                >
                  <MicVocal size={18} />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-800 text-white"
                >
                  <MicOff size={18} />
                </button>
              )}

              {recordedUrl && (
                <>
                  <button
                    onClick={() => new Audio(recordedUrl).play()}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white"
                  >
                    <PlayCircle size={18} />
                  </button>

                  <a
                    href={recordedUrl}
                    download="karaoke-recording.webm"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white"
                  >
                    <Download size={18} />
                  </a>
                </>
              )}
            </div>

            {/* Progress */}
            <div className="mt-2 w-full">
              <div className="w-full h-1 bg-black/20 rounded-full">
                <div
                  className="h-1 bg-white rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
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
              const isActive =
                currentTime >= line.time &&
                (idx === lyricsLines.length - 1 ||
                  currentTime < lyricsLines[idx + 1].time);

              return (
                <p
                  key={idx}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-400/30 text-purple-900 rounded px-1"
                      : "text-gray-700 px-1"
                  }`}
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
