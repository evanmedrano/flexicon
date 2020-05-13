import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InstrumentalPlayerSlider from "../InstrumentalPlayerSlider/InstrumentalPlayerSlider";

function InstrumentalPlayerVolumeControl(props) {
  const {
    audioElement,
    mute,
    volume,
    handleVolumeLevel,
    handleMuteToggle,
    handleVolumeUpdate,
    volumeBar
  } = props;

  return (
    <>
      <div className="instrumental-player-volume-control">
        {mute ? (
          <FontAwesomeIcon
            icon="volume-mute"
            title="Unmute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        ) : (
          <FontAwesomeIcon
            icon="volume-up"
            title="Mute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        )}
        <InstrumentalPlayerSlider
          handleMuteToggle={handleMuteToggle}
          handleVolumeUpdate={handleVolumeUpdate}
          mute={mute}
          slider={volumeBar}
          sliderControl="volume"
        />
      </div>
    </>
  );
}

export default InstrumentalPlayerVolumeControl;
