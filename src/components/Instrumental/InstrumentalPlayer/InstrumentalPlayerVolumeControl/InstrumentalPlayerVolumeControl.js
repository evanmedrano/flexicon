import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

import InstrumentalPlayerSlider from '../InstrumentalPlayerSlider/InstrumentalPlayerSlider';

function InstrumentalPlayerVolumeControl({ audioElement }) {
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const volumeBar = useRef()

  useEffect(() => {
    if (mute) {
      handleVolumeLevel(0);
    } else {
      handleVolumeLevel(volume);
    }
  }, [mute])

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
    <>
      <div className="instrumental-player-volume-control">
        {mute ? (
          <FontAwesomeIcon
            icon={faVolumeMute}
            title="Unmute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faVolumeUp}
            title="Mute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        )}
        <InstrumentalPlayerSlider
          handleVolumeUpdate={handleVolumeUpdate}
          slider={volumeBar}
          sliderControl="volume"
        />
      </div>
    </>
  )
}

export default InstrumentalPlayerVolumeControl;
