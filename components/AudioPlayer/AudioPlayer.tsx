import React, { useState, useRef, useEffect } from "react";
import PlayButton from "../../assets/play-button.png";
import PauseButton from "../../assets/pause.png";
// import '../../styles/AudioPlayer.module.css'

const AudioPlayer: React.FC = () => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fileNumber, setFileNumber] = useState(0);
  const [audioUrl, setAudioUrl] = useState(
    `https://node-stream-api.herokuapp.com//stream/${100 + fileNumber}`
  );

  // References
  const audioPlayer = useRef<HTMLAudioElement | null>();
  const progressBar = useRef<HTMLInputElement | null>();
  const animationRef = useRef<any>();

  useEffect(() => {
    // let seconds = 0;

    // if (audioPlayer.current.onloadedmetadata) {
    // }
    const seconds = Math.floor(audioPlayer.current.duration);

    setDuration(seconds);
    progressBar.current.max = `${seconds}`;
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
    audioUrl,
  ]);

  const calculateTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(duration % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(parseInt(progressBar.current.value) / duration) * 100}%`
    );
    setCurrentTime(parseInt(progressBar.current.value));
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = parseInt(progressBar.current.value);
    changePlayerCurrentTime();
  };

  const whilePlaying = () => {
    progressBar.current.value = `${audioPlayer.current.currentTime}`;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (fileNumber === 25) return;
    
    setFileNumber(fileNumber + 1)
    setAudioUrl(`http://65.2.74.184:5000/stream/${100 + fileNumber}`)
    setCurrentTime(0)
  }

  const previousSong = () => {
    if (fileNumber === 0) return;

    setFileNumber(fileNumber - 1)
    setAudioUrl(`http://65.2.74.184:5000/stream/${100 + fileNumber}`)
    setCurrentTime(0)
  }

  const onPlayingHandler = () => {
    setIsPlaying(true)
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  return (
    <div className="relative w-full h-full bg-black">
      <audio
        key={fileNumber}
        className="hidden"
        ref={audioPlayer}
        src={audioUrl}
        onEnded={nextSong}
        onPlaying={onPlayingHandler}
        controls
        autoPlay
      />

      <input
        className="absolute -top-1 w-full h-1 progressBar overflow-hidden"
        defaultValue={0}
        step={1}
        max={duration}
        type="range"
        ref={progressBar}
        onChange={changeRange}
      />

      <p className="absolute text-white font-raleway top-4 left-6 md:left-24">
        {calculateTime(currentTime)}
      </p>
      <p className="absolute text-white font-raleway top-4 right-6 md:right-24">
        {typeof duration === "number" && !isNaN(duration)
          ? calculateTime(duration)
          : "00:00"}
      </p>

      <button onClick={togglePlayPause}>
        <img
          className="absolute w-12 md:w-16 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={isPlaying ? PauseButton.src : PlayButton.src}
          alt="PlayButton"
        />
      </button>
      <button
        onClick={previousSong}
        className={`absolute text-xl md:text-5xl font-bold text-white font-raleway top-1/2 left-16 md:left-64 transform -translate-x-1/2 -translate-y-1/2 ${
          fileNumber === 0 ? "opacity-50" : ""
        }`}
      >
        PREV
      </button>
      <button
        onClick={nextSong}
        className={`absolute text-xl md:text-5xl font-bold text-white font-raleway top-1/2 right-4 md:right-36 transform -translate-x-1/2 -translate-y-1/2 ${
          fileNumber === 25 ? "opacity-50" : ""
        }`}
      >
        NEXT
      </button>
    </div>
  );
};

export default AudioPlayer;
