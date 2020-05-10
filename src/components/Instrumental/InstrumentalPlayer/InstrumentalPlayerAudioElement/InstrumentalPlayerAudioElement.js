import React, { useEffect } from 'react';

function InstrumentalPlayerAudioElement(props) {
  const {
    audioElement,
    handleInstrumentalEnding,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    instrumental,
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
        onEnded={() => handleInstrumentalEnding(instrumental)}
        key={instrumental.id}
        ref={audioElement}
        onPlay={handleInstrumentalPlay}
        onPause={handleInstrumentalPause}
      >
        <source src={instrumental.track || instrumental.preview} />
      </audio>
    </div>
  )
}

export default InstrumentalPlayerAudioElement;
