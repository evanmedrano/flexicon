import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

function InstrumentalPlayerVolumeControl(props) {
  const {
    audioElement,
    handleStartOfSliderDrag,
    handleSliderDrag,
    handleEndOfSliderDrag,
    handleMuteToggle,
    handleVolumeUpdate,
    mute,
    volume,
    volumeBar
  } = props;

  return (
    <div className="instrumental-player__volume-container">
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
      <div
        onMouseUp={handleVolumeUpdate}
        className="instrumental-player__draggable-container"
        id="volume-container"
      >
        <div ref={volumeBar} className="instrumental-player__volume-bar">
          <div
            draggable="true"
            onDragStart={event => handleStartOfSliderDrag(event, volumeBar)}
            onDrag={event => handleSliderDrag(event, volumeBar)}
            onDragEnd={event => handleEndOfSliderDrag(event, volumeBar)}
            id="volume-circle"
            className="instrumental-player__draggable-circle"
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstrumentalPlayerVolumeControl;
