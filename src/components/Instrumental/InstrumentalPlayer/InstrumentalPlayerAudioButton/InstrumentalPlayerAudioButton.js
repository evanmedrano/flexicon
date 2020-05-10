import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faPlayCircle,
  faPauseCircle,
  faRandom,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";


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

  const baseIconClass = 'instrumental-player-audio-control__icon';


  return (
    <div className="instrumental-player-audio-control__buttons">
      <FontAwesomeIcon
        icon={faRandom}
        title={shuffling ? "Don't shuffle" : "Shuffle"}
        onClick={handleInstrumentalShuffle}
        className={shuffling ? `${baseIconClass}--active` : baseIconClass}
      />
      <FontAwesomeIcon
        icon={faChevronCircleLeft}
        title="Previous"
        onClick={onPreviousInstrumental}
        className="instrumental-player-audio-control__icon ml-5"
      />
      {playing ? (
        <FontAwesomeIcon
          icon={faPauseCircle}
          title="Pause"
          onClick={handleInstrumentalPause}
          className="instrumental-player-audio-control__pause-icon"
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlayCircle}
          title="Play"
          onClick={handleInstrumentalPlay}
          className="instrumental-player-audio-control__play-icon"
        />
      )}
      <FontAwesomeIcon
        icon={faChevronCircleRight}
        title="Next"
        onClick={onNextInstrumental}
        className="instrumental-player-audio-control__icon mr-5"
      />
      <FontAwesomeIcon
        icon={faRetweet}
        title={looping ? "Don't repeat" : "Repeat"}
        onClick={handleInstrumentalLoop}
        className={looping ? `${baseIconClass}--active` : baseIconClass}
      />
    </div>
  )
}

export default InstrumentalPlayerAudioButton;
