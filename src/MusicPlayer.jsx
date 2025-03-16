import React, { useState } from "react";
import toca from "./music/toca-toca.mp3"
import doom from "./music/chak-doom.mp3"
import babyShark from "./music/baby-shark.mp3"
import bgmusic from "./music/background.mp3"
import applause from "./music/applause.mp3"
import softInspire from "./music/soft-inspire.mp3"

const PlayStatus = {
  "PAUSED": "PAUSED",
  "PLAYING": "PLAYING"
}
const MusicPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentAudioStatus, setCurrentAudioStatus] = useState(null);
  const [currentBgFile, setCurrentBgFile] = useState(null);
  const [currentBGAudioStatus, setCurrentBGAudioStatus] = useState(null);

  const [bgAudio, setBgAudio] = useState(null)

  const musicConfigs = [
    { file: toca, name: "Toca Toca" },
    { file: doom, name: "Chak Dhoom" },
    { file: babyShark, name: "Baby shark" },

  ];
  const bgMusicConfigs = [
    { file: bgmusic, name: "Piano" },
    { file: applause, name: "Applause" },
    { file: softInspire, name: "Soft Inspire" },

  ];

  function foreColor(currentMusicFile, file, playStatus) {
    return currentMusicFile === file ? playStatus === PlayStatus.PAUSED ? "black" : "white" : "black";
  }

  function bgColor(currentMusicFile, file, playStatus) {
    return currentMusicFile === file ? playStatus === PlayStatus.PAUSED ? "grey" : "darkblue" : "lightblue";

  }

  const toggleMusic = (file) => {
    if (currentAudio && currentFile === file) {
      if (!currentAudio.paused) {
        setCurrentAudioStatus(PlayStatus.PAUSED)
        currentAudio.pause();
      } else {
        setCurrentAudioStatus(PlayStatus.PLAYING)
        currentAudio.play();
      }
      return;
    }
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudioStatus(PlayStatus.PAUSED)
      currentAudio.currentTime = 0;
    }
    const newAudio = new Audio(file);
    setCurrentAudio(newAudio);
    setCurrentFile(file);
    newAudio.play();
    setCurrentAudioStatus(PlayStatus.PLAYING)
  };

  const toggleBgMusic = (file) => {
    if (bgAudio && currentBgFile === file) {
      if (!bgAudio.paused) {
        bgAudio.pause();
        setCurrentBGAudioStatus(PlayStatus.PAUSED)
      } else {
        setCurrentBGAudioStatus(PlayStatus.PLAYING)
        bgAudio.play();
      }
      return;
    }
    if (bgAudio) {
      bgAudio.pause();
      setCurrentBGAudioStatus(PlayStatus.PAUSED)
      bgAudio.currentTime = 0;
    }
    const newAudio = new Audio(file);
    setBgAudio(newAudio);
    setCurrentBgFile(file);
    newAudio.play();
    newAudio.loop = true;
    setCurrentBGAudioStatus(PlayStatus.PLAYING)

  };

  const restartMusic = () => {
    if (currentAudio) {
      currentAudio.currentTime = 0;
      currentAudio.play()
      setCurrentAudioStatus(PlayStatus.PLAYING);
    }
  };
  const adjustBgVolume = (event) => {
    if (bgAudio) {
      bgAudio.volume = event.target.value;
    }
  };
  const adjustVolume = (event) => {
    if (currentAudio) {
      currentAudio.volume = event.target.value;
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", height: "300px" }}>
      <h1>Music Player</h1>
      <div style={{ marginTop: 20, float: "left", border: "solid 1px #242442" }}>
        <div>
          <input type="range" min="0" max="1" step="0.1" defaultValue="1" onChange={adjustBgVolume} />
        </div>
        <div style={{ marginTop: 20, float: "left" }}>

          {bgMusicConfigs.map(({ file, name }, index) => (
            <div key={index} style={{ float: 'left' }}>
              <button
                style={{
                  width: 150, height: 50, borderRadius: 20, margin: 10, fontSize: 20,
                  backgroundColor: bgColor(currentBgFile, file, currentBGAudioStatus),
                  color: foreColor(currentBgFile, file, currentBGAudioStatus),
                  border: "none", cursor: "pointer"
                }}
                onClick={() => toggleBgMusic(file)}
              >
                {name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20, float: "left", clear: "left", border: "solid 1px #242442" }}>
        <div>
          <input type="range" min="0" max="1" step="0.1" defaultValue="1" onChange={adjustVolume} style={{ float: "left" }} />
        </div>
        <div style={{ marginTop: 20, float: "left" }}>
          {musicConfigs.map(({ file, name }, index) => (
            <div key={index} style={{ float: 'left' }}>
              <button
                style={{
                  width: 150, height: 50, margin: 10, fontSize: 20, borderRadius: 20,
                  backgroundColor: bgColor(currentFile, file, currentAudioStatus),
                  color: foreColor(currentFile, file, currentAudioStatus),
                  boxShadow: "initial",
                  border: "none", cursor: "pointer"
                }}
                onClick={() => toggleMusic(file)}
              >
                {name}
              </button>
              {currentFile === file && (
                <button
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 24,
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "50%",

                  }}
                  onClick={restartMusic}
                  title="Restart Music"
                >
                  🔄
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;
