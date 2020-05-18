import React, { useEffect, useRef, useState } from "react";

import * as InstrumentalPlayer from './';

function InstrumentalPlayerContainer(props) {
  const {
    currentInstrumental,
    handleInstrumentalEnding,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    handleInstrumentalShuffle,
    handleNextInstrumental,
    handlePreviousInstrumental,
    isInstrumentalLiked,
    playing,
    shuffling
  } = props;

  const [looping, setLooping] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioElement = useRef(null);
  const volumeBar = useRef();

  useEffect(() => {
    if (audioElement.current) {
      if (mute) {
        handleVolumeLevel(0);
      } else {
        handleVolumeLevel(volume);
      }
    }
  });

  if (!currentInstrumental) {
    return null;
  }

  const handleInstrumentalLoop = () => {
    setLooping(!looping);
  }

  const handleMuteToggle = () => {
    setMute(!mute)
  }

  const handleVolumeLevel = volumeLevel => {
    audioElement.current.volume = volumeLevel;
    volumeBar.current.style.width = volumeLevel * 100 + '%';
  }

  const handleVolumeUpdate = update => {
    const volumeUpdate = update * 10 / 10;

    audioElement.current.volume = volumeUpdate;
    setVolume(volumeUpdate);
  }

  return (
    <div data-testid="instrumental-player" className="instrumental-player-container">
      <InstrumentalPlayer.Detail
        currentInstrumental={currentInstrumental}
        handleInstrumentalLike={handleInstrumentalLike}
        likedInstrumental={isInstrumentalLiked()}
      />
      <InstrumentalPlayer.AudioControl
        audioElement={audioElement}
        handleInstrumentalLoop={handleInstrumentalLoop}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        handleInstrumentalShuffle={handleInstrumentalShuffle}
        handleNextInstrumental={handleNextInstrumental}
        handlePreviousInstrumental={handlePreviousInstrumental}
        looping={looping}
        playing={playing}
        shuffling={shuffling}
        volume={volume}
      />
      <InstrumentalPlayer.VolumeControl
        audioElement={audioElement}
        handleMuteToggle={handleMuteToggle}
        handleVolumeLevel={handleVolumeLevel}
        handleVolumeUpdate={handleVolumeUpdate}
        mute={mute}
        volume={volume}
        volumeBar={volumeBar}
      />
      <InstrumentalPlayer.AudioElement
        audioElement={audioElement}
        handleInstrumentalEnding={handleInstrumentalEnding}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        currentInstrumental={currentInstrumental}
        looping={looping}
        playing={playing}
      />
    </div>
  );
}

export default InstrumentalPlayerContainer;
