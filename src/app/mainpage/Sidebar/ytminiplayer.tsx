"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaTimes, FaSearch, FaChevronUp, FaChevronDown } from "react-icons/fa";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YTMiniPlayer = ({ onClose }: { onClose: () => void }) => {
  const [videoId, setVideoId] = useState<string | null>("dQw4w9WgXcQ"); // Default video
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  }, []);

  const createPlayer = () => {
    if (!playerContainerRef.current || playerRef.current || !window.YT) return;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      height: "180",
      width: "320",
      videoId: videoId || "",
      playerVars: { autoplay: 1 },
      events: {
        onReady: (event: any) => {
          playerRef.current = event.target;
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  };

  // Wait for playerRef to be defined before changing video
  useEffect(() => {
    if (videoId) {
      setTimeout(() => {
        if (playerRef.current?.loadVideoById) {
          playerRef.current.loadVideoById(videoId);
        }
      }, 500); // Delay to ensure player is initialized
    }
  }, [videoId]);

  // Fetch video suggestions without API key
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`https://corsproxy.io/?https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`);
      const text = await res.text();
      const videoIds = [...text.matchAll(/"videoId":"(.*?)"/g)].map((m) => m[1]);
      const titles = [...text.matchAll(/"title":{"runs":\[{"text":"(.*?)"}\]/g)].map((m) => m[1]);
      const thumbnails = [...text.matchAll(/"thumbnails":\[\{"url":"(.*?)"/g)].map((m) => m[1]);

      const results = videoIds.slice(0, 5).map((id, index) => ({
        videoId: id,
        title: titles[index] || "Unknown Title",
        thumbnail: thumbnails[index] || "",
      }));

      setSuggestions(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Remove a video suggestion
  const removeSuggestion = (videoIdToRemove: string) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((video) => video.videoId !== videoIdToRemove)
    );
  };

  return (
    <motion.div
      className="fixed bottom-0 right-5 bg-gray-900 text-white p-3 rounded-t-lg shadow-xl w-[340px] z-[999]"
      initial={{ y: "100%" }}
      animate={{ y: isExpanded ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-t-lg hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
      </button>

      {/* Close Button */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>
        <FaTimes />
      </button>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded">
        <input
          type="text"
          placeholder="Search video..."
          className="flex-1 bg-transparent border-none outline-none text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="p-2 hover:bg-gray-700 rounded">
          <FaSearch />
        </button>
      </div>

      {/* Video Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-gray-800 mt-2 p-2 rounded max-h-[200px] overflow-y-auto">
          {suggestions.map((video) => (
            <div key={video.videoId} className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
              <img
                src={video.thumbnail}
                alt="Thumbnail"
                className="w-12 h-12 rounded"
                onClick={() => setVideoId(video.videoId)}
              />
              <p className="text-sm flex-1" onClick={() => setVideoId(video.videoId)}>
                {video.title}
              </p>
              <button
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent clicking on the video title
                  removeSuggestion(video.videoId);
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* YouTube Player */}
      <div className="mt-3">
        <div ref={playerContainerRef} className="rounded overflow-hidden"></div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-3 mt-3">
        <button className="p-2 hover:bg-gray-700 rounded" onClick={() => playerRef.current?.playVideo()}>
          <FaPlay />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded" onClick={() => playerRef.current?.pauseVideo()}>
          <FaPause />
        </button>
      </div>
    </motion.div>
  );
};

export default YTMiniPlayer;
