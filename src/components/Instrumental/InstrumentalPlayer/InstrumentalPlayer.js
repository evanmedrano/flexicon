import React, { useRef } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as unlikedBeat } from "@fortawesome/free-regular-svg-icons";
import { faHeart as likedBeat } from "@fortawesome/free-solid-svg-icons";

function InstrumentalPlayer(props) {
  const {
    handleInstrumentalEnding,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    instrumental,
    playing
  } = props;

  const instrumentalAudio = useRef(null);

  if (!instrumental) {
    return null;
  }

  if (playing === false) {
    instrumentalAudio.current.pause();
  }

  if (instrumentalAudio.current !== null && playing === true) {
    instrumentalAudio.current.play();
  }

  return (
    <div className="instrumental-player">
      <div className="instrumental-player__details">
        <span className="mr-4">{instrumental.title}</span>
        <FontAwesomeIcon icon={unlikedBeat} />
      </div>
      <div className="instrumental-player__controls">
        {playing ? (
          <span onClick={() => handleInstrumentalPause(instrumental)}>
            Pause
          </span>
        ) : (
          <span onClick={() => handleInstrumentalPlay(instrumental)}>
            Play
          </span>
        )}
      </div>
      <audio
        autoPlay
        controls
        id="instrumental-audio"
        onEnded={() => handleInstrumentalEnding(instrumental)}
        key={instrumental.id}
        ref={instrumentalAudio}
        onPlay={() => handleInstrumentalPlay(instrumental)}
        onPause={() => handleInstrumentalPause(instrumental)}
        className="instrumental-player__controls"
      >
        <source
          src={instrumental.track || instrumental.preview}
          type="audio/mpeg"
        />
      </audio>
    </div>
  )
}

export { InstrumentalPlayer };
