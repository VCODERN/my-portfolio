"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/*
import { FaPlay, FaPause, FaTimes, FaUpload, FaList, FaTrash, FaEyeSlash, FaEye } from "react-icons/fa";

const MiniPlayer = ({ onClose }: { onClose: () => void }) => {
  const [audioFiles, setAudioFiles] = useState<{ name: string; url: string }[]>([]);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playlists, setPlaylists] = useState<{ [key: string]: string[] }>({});
  const [isVisible, setIsVisible] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // Reset audio files and playlists on load
    setAudioFiles([]);
    setPlaylists({});
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      const updatedFiles = [...audioFiles, ...newFiles];
      setAudioFiles(updatedFiles);
      localStorage.setItem("songs", JSON.stringify(updatedFiles));
    }
  };

  const playTrack = (url: string) => {
    if (currentTrack === url && isPlaying) {
      togglePlayPause();
      return;
    }
    setCurrentTrack(url);
    setIsPlaying(false); // Ensure it updates before playing
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }

      audioRef.current.src = currentTrack;
      audioRef.current.play();
      setIsPlaying(true);

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaElementSource(audioRef.current);

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      analyserRef.current = analyser;
      audioCtxRef.current = audioCtx;
      sourceRef.current = source;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      const draw = () => {
        if (!ctx || !analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArrayRef.current[i] / 2;
          ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }

        animationRef.current = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (audioCtxRef.current) audioCtxRef.current.close();
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if (sourceRef.current) {
          sourceRef.current.disconnect();
        }
      };
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume / 100;
  };

  const handlePlaylistSelect = (playlistName: string) => {
    setSelectedPlaylist(playlistName);
  };

  const addToPlaylist = (songUrl: string, playlistName: string) => {
    setPlaylists((prev) => ({
      ...prev,
      [playlistName]: [...(prev[playlistName] || []), songUrl],
    }));
  };

  const deletePlaylist = (playlistName: string) => {
    setPlaylists((prev) => {
      const updated = { ...prev };
      delete updated[playlistName];
      return updated;
    });
  };

  const togglePlayerVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-5 right-5 bg-gray-900 text-white p-5 rounded-xl shadow-2xl w-96 h-auto flex flex-col gap-4"
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}>
          <FaTimes size={18} />
        </button>

        <input type="file" multiple accept="audio/*" onChange={handleFileUpload} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="flex items-center gap-2 cursor-pointer">
          <FaUpload /> Upload Music
        </label>

        <ul>
          {audioFiles.map((file) => (
            <li key={file.url} className="flex justify-between items-center p-2 bg-gray-800 rounded-md">
              <span>{file.name}</span>
              <button onClick={() => playTrack(file.url)}>
                <FaPlay />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="w-full" />
        </div>

        <canvas ref={canvasRef} width="300" height="100" className="bg-black rounded-md"></canvas>

        <h3>Playlists</h3>
        {Object.keys(playlists).map((playlist) => (
          <div key={playlist} className="flex justify-between items-center p-2 bg-gray-800 rounded-md">
            <span>{playlist}</span>
            <button onClick={() => handlePlaylistSelect(playlist)}>
              <FaList />
            </button>
            <button onClick={() => deletePlaylist(playlist)}>
              <FaTrash />
            </button>
          </div>
        ))}

        <audio ref={audioRef} onEnded={handleTrackEnd} />
      </motion.div>

      <button
        onClick={togglePlayerVisibility}
        className="fixed bottom-20 right-5 bg-gray-700 p-2 rounded-full"
      >
        {isVisible ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
      </button>
    </>
  );
};
*/

