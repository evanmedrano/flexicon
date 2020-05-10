import React, { useState } from 'react';

import InstrumentalPlayerAudioButton from '../InstrumentalPlayerAudioButton/InstrumentalPlayerAudioButton';
import InstrumentalPlayerTimeControl from '../InstrumentalPlayerTimeControl/InstrumentalPlayerTimeControl';

function InstrumentalPlayerAudioControl(props) {
  const {
    handlePreviousInstrumental,
    handleNextInstrumental,
    handleInstrumentalPause,
    looping,
    shuffling,
    handleInstrumentalPlay,
    handleInstrumentalLoop,
    handleInstrumentalShuffle,
    audioElement,
    playing,
  } = props;

  const [duration, setDuration] = useState(30);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);

  const updateAudioTime = result => {
    setTime(result)
  }
  const handleAudioProgress = () => {
    setTime(Math.floor(audioElement.current.currentTime));
    setProgress((time / duration) * 100);
  }

  const handleTimeReset = () => {
    audioElement.current.currentTime = 0;
    setTime(0);
  }

  return (
    <div className="instrumental-player-audio-control">
      <InstrumentalPlayerAudioButton
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        handleInstrumentalLoop={handleInstrumentalLoop}
        handleInstrumentalShuffle={handleInstrumentalShuffle}
        handleNextInstrumental={handleNextInstrumental}
        handlePreviousInstrumental={handlePreviousInstrumental}
        handleTimeReset={handleTimeReset}
        looping={looping}
        playing={playing}
        shuffling={shuffling}
        time={time}
      />
      <InstrumentalPlayerTimeControl
        audioElement={audioElement}
        duration={duration}
        handleAudioProgress={handleAudioProgress}
        updateAudioTime={updateAudioTime}
        progress={progress}
        playing={playing}
        time={time}
      />
    </div>
  )
}

export default InstrumentalPlayerAudioControl;
