import React, { useRef, useState } from "react";

import * as InstrumentalPlayer from './';

function InstrumentalPlayerContainer(props) {
  const {
    currentInstrumental,
    handleInstrumentalEnding,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    handleInstrumentalShuffle,
    handleNextInstrumental,
    handlePreviousInstrumental,
    playing,
    shuffling
  } = props;

  const [looping, setLooping] = useState(false);
  const audioElement = useRef(null);

  if (!currentInstrumental) {
    return null;
  }

  const handleInstrumentalLoop = () => {
    setLooping(!looping);
  }

  return (
    <div data-testid="instrumental-player" className="instrumental-player-container">
      <InstrumentalPlayer.Detail currentInstrumental={currentInstrumental} />
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
        currentInstrumental={currentInstrumental}
        looping={looping}
        playing={playing}
      />
    </div>
  );
}

export { InstrumentalPlayerContainer };
