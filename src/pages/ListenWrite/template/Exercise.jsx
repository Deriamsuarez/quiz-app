import React, { useState, useRef, useEffect } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

const Exercise = ({ handleNext, sentence, setIsAnswerSelected, word, inputValue, setInputValue, errorMessage }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const toggleAudio = () => {
    const audioElement = audioRef.current;
    if (audioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const updateTime = () => {
    const audioElement = audioRef.current;
    setCurrentTime(audioElement.currentTime);
  };

  const handleProgressClick = (e) => {
    const audioElement = audioRef.current;
    const progressBar = progressRef.current;
    const newTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * audioElement.duration;
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      setIsAnswerSelected(true);
    } else {
      setIsAnswerSelected(false);
    }
  }, [inputValue]);

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col h-full items-center justify-center">
      <div className="flex items-center justify-center w-full">
        <audio ref={audioRef} src={word.url} onTimeUpdate={updateTime} onEnded={() => setAudioPlaying(false)}></audio>
        <button
          onClick={toggleAudio}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-500 hover:border-blue-600 rounded-r-none focus:outline-none"
        >
          {audioPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        </button>
        <input
          className="w-full border rounded-md rounded-l-none px-4 py-2 border-l-0 focus:outline-none"
          placeholder="Type the sentence here..."
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="w-full realtive" onClick={handleProgressClick} ref={progressRef}>
        <progress className="w-full progress" value={currentTime} max={audioRef.current?.duration || 0}></progress>
      {errorMessage && <p className="text-red-500 absolute">{errorMessage}</p>} {/* Mostrar mensaje de error si existe */}
      </div>
    </div>
  );
};

export default Exercise;
