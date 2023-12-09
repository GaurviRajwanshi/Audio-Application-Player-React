import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";
import { IconButton, Grid, Typography } from "@mui/material";
import audioFile1 from "../MockData/AudioFiles/DummyAudio.mp3";
import audioFile2 from "../MockData/AudioFiles/DummyAudio2.mp3";
import audioFile3 from "../MockData/AudioFiles/DummyAudio3.mp3";
import audioFile4 from "../MockData/AudioFiles/DummyAudio4.mp3";
import audioFile6 from "../MockData/AudioFiles/DummyAudio6.mp3";

const MusicPlayer = ({
  isCurrentPlayingDeleted,
  setIsCurrentPlayingDeleted,
  handlePlay,
  currentlyPlaying,
  songMockData,
  setSongMockData,
  setCurrentlyPlaying,
}) => {
  const songList = songMockData;
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isCurrentPlayingDeleted == true) {
      const currentIndex = songList.findIndex(
        (song) => song.key === currentlyPlaying.key
      );
      if (currentIndex === -1) {
        if (songList.length === 0) {
          console.log(currentlyPlaying);
          setCurrentlyPlaying("");
        }
        if (currentIndex < songList.length - 1) {
          const newIndex = currentIndex + 1;
          handleSongChange(songList[newIndex]);
        }
      }
      setIsCurrentPlayingDeleted(false);
    }
  }, [isCurrentPlayingDeleted]);

  const getAudioFile = (songname) => {
    if (songname === "DummySong1") {
      return audioFile1;
    } else if (songname === "DummySong2") {
      return audioFile2;
    } else if (songname === "DummySong3") {
      return audioFile3;
    } else if (songname === "DummySong4") {
      return audioFile4;
    } else if (songname === "DummySong5" || songname === "DummySong6") {
      return audioFile6;
    } else if (songname === undefined) {
      return;
    } else {
      return audioFile6;
    }
  };

  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.src = "";
      setCurrentTime(0);
      setIsPlaying(false);

      audio.src = getAudioFile(currentlyPlaying.songname);
      audio.load();
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      audio.addEventListener("loadedmetadata", () => {
        setCurrentTime(0);
      });
    }
  }, [currentlyPlaying, audio]);
  const handlePlayPause = () => {
    try {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const handleSkipPrevious = () => {
    const currentIndex = songList.findIndex(
      (song) => song.key === currentlyPlaying.key
    );
    const newIndex = currentIndex - 1;

    if (newIndex >= 0) {
      handleSongChange(songList[newIndex]);
    }
  };

  const handleSkipNext = () => {
    const currentIndex = songList.findIndex(
      (song) => song.key === currentlyPlaying.key
    );
    if (currentIndex !== -1 && currentIndex < songList.length - 1) {
      const newIndex = currentIndex + 1;
      handleSongChange(songList[newIndex]);
    }
  };
  const handleSongChange = (newSong) => {
    setCurrentlyPlaying(newSong);
    handlePlay(newSong);
  };

  const handleSeekBarChange = (e, newValue) => {
    if (isFinite(newValue) && isFinite(audio.duration)) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const updateCurrentTime = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    handleSkipNext();
  };

  useEffect(() => {
    audio.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [audio]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={currentlyPlaying.img}
              alt="Icon"
              style={{ width: "60px", height: "60px", marginRight: "10px" }}
            />
            <Typography>{currentlyPlaying.songname}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleSkipPrevious}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={handlePlayPause}>
              {isPlaying || !audio.paused ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton onClick={handleSkipNext}>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <Slider
        value={currentTime}
        max={audio.duration}
        onChange={handleSeekBarChange}
        sx={{
          color: "black",
          "& .MuiSlider-thumb": {
            backgroundColor: "#FFDB58",
          },
        }}
      />
    </>
  );
};
export default MusicPlayer;
