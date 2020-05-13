import React, { useEffect } from 'react';

function InstrumentalPlayerAudioElement(props) {
  const {
    audioElement,
    currentInstrumental,
    handleInstrumentalEnding,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    looping,
    playing
  } = props;

  useEffect(() => {
    if (audioElement.current) {
      handleAudioPlay();
      handleAudioLoop();
    }
  }, [playing, looping])

  const handleAudioPlay = () => {
    if (playing) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }

  const handleAudioLoop = () => {
    if (looping) {
      audioElement.current.loop = true;
    } else {
      audioElement.current.loop = false;
    }
  }

  return (
    <div>
      <audio
        autoPlay
        id="instrumental-audio"
        onEnded={() => handleInstrumentalEnding(currentInstrumental)}
        key={currentInstrumental.id}
        ref={audioElement}
        onPlay={handleInstrumentalPlay}
        onPause={handleInstrumentalPause}
      >
        <source src={currentInstrumental.track || currentInstrumental.preview} />
      </audio>
    </div>
  )
}

export default InstrumentalPlayerAudioElement;
