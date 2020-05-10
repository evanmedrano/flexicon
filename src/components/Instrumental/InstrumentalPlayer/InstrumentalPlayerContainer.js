import React, { useRef, useState } from "react";

import * as InstrumentalPlayer from './';

function InstrumentalPlayerContainer(props) {
  const {
    handleInstrumentalEnding,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    handleInstrumentalShuffle,
    handleNextInstrumental,
    handlePreviousInstrumental,
    instrumental,
    playing,
    shuffling
  } = props;

  const [looping, setLooping] = useState(false);
  const audioElement = useRef(null);

  if (!instrumental) {
    return null;
  }

  const handleInstrumentalLoop = () => {
    setLooping(!looping);
  }

  return (
    <div data-testid="instrumental-player" className="instrumental-player-container">
      <InstrumentalPlayer.Detail instrumental={instrumental} />
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
      />
      <InstrumentalPlayer.VolumeControl audioElement={audioElement} />
      <InstrumentalPlayer.AudioElement
        audioElement={audioElement}
        handleInstrumentalEnding={handleInstrumentalEnding}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        instrumental={instrumental}
        looping={looping}
        playing={playing}
      />
    </div>
  );
}

export { InstrumentalPlayerContainer };
