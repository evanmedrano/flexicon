import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstrumentalPlayerAudioButton(props) {
  const {
    looping,
    shuffling,
    handlePreviousInstrumental,
    handleNextInstrumental,
    handleInstrumentalPause,
    handleInstrumentalShuffle,
    handleTimeReset,
    playing,
    time,
    handleInstrumentalPlay,
    handleInstrumentalLoop
  } = props

  const onNextInstrumental = () => {
    handleTimeReset();
    handleNextInstrumental();
  };

  const onPreviousInstrumental = () => {
    if (time > 0) {
      handleTimeReset();
    } else {
      handlePreviousInstrumental();
    }
    handleTimeReset();
  };

  const baseIconClass = 'instrumental-player-audio-button__icon';


  return (
    <div className="instrumental-player-audio-button">
      <FontAwesomeIcon
        icon="random"
        title={shuffling ? "Don't shuffle" : "Shuffle"}
        onClick={handleInstrumentalShuffle}
        className={shuffling ? `${baseIconClass}--active` : baseIconClass}
      />
      <FontAwesomeIcon
        icon="chevron-circle-left"
        title="Previous"
        onClick={onPreviousInstrumental}
        className="instrumental-player-audio-button__icon ml-5"
      />
      {playing ? (
        <FontAwesomeIcon
          icon="pause-circle"
          title="Pause"
          onClick={handleInstrumentalPause}
          className="instrumental-player-audio-button__pause-icon"
        />
      ) : (
        <FontAwesomeIcon
          icon="play-circle"
          title="Play"
          onClick={handleInstrumentalPlay}
          className="instrumental-player-audio-button__play-icon"
        />
      )}
      <FontAwesomeIcon
        icon="chevron-circle-right"
        title="Next"
        onClick={onNextInstrumental}
        className="instrumental-player-audio-button__icon mr-5"
      />
      <FontAwesomeIcon
        icon="retweet"
        title={looping ? "Don't repeat" : "Repeat"}
        onClick={handleInstrumentalLoop}
        className={looping ? `${baseIconClass}--active` : baseIconClass}
      />
    </div>
  )
}

export default InstrumentalPlayerAudioButton;
