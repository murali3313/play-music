import React, { useState, useRef } from "react";
import toca from "./music/toca-toca.mp3"
import doom from "./music/chak-doom.mp3"
import bgmusic from "./music/background.mp3"

const MusicPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentBgFile, setCurrentBgFile] = useState(null);
  const bgAudioRef1 = useRef(new Audio(bgmusic));
  bgAudioRef1.current.loop = true;

  const [bgAudio, setBgAudio] = useState(null)

  const musicConfigs = [
    { file: toca, name: "Toca Toca" },
    { file: doom, name: "Chak Dhoom" },

  ];
  const bgMusicConfigs = [
    { file: bgmusic, name: "Piano" },

  ];
  const toggleMusic = (file) => {
    if (currentAudio && currentFile === file) {
      if (!currentAudio.paused) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      return;
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const newAudio = new Audio(file);
    setCurrentAudio(newAudio);
    setCurrentFile(file);
    newAudio.play();
  };

  const toggleBgMusic = (file) => {
    if (bgAudio && currentBgFile === file) {
      if (!bgAudio.paused) {
        bgAudio.pause();
      } else {
        bgAudio.play();
      }
      return;
    }
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
    const newAudio = new Audio(file);
    setBgAudio(newAudio);
    setCurrentBgFile(file);
    newAudio.play();
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
                  width: 150, borderRadius: 500, height: 80, margin: 10, fontSize: 20,
                  backgroundColor: currentBgFile === file ? "darkblue" : "lightblue",
                  color: currentBgFile === file ? "white" : "black",
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
                  width: 200, height: 80, margin: 10, fontSize: 20,
                  backgroundColor: currentFile === file ? "darkblue" : "lightblue",
                  color: currentFile === file ? "white" : "black",
                  boxShadow: "initial",
                  border: "none", cursor: "pointer"
                }}
                onClick={() => toggleMusic(file)}
              >
                {name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;