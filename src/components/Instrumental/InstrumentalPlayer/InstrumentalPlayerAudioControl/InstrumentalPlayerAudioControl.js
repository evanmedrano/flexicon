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

  const handleAudioProgress = () => {
    setTime(Math.floor(audioElement.current.currentTime));
    setProgress((time / duration) * 100);
  }

  const handleTimeUpdate = update => {
    const result = Math.floor(update * duration);
    audioElement.current.currentTime = result;
    setTime(result);
  }

  const handleAudioDrag = update => {
    let result = Math.floor(update * duration);

    if (result > 30) {
      result = 30;
    } else if (result < 0) {
      result = 0;
    }

    setTime(result);
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
        handleAudioDrag={handleAudioDrag}
        handleAudioProgress={handleAudioProgress}
        handleTimeUpdate={handleTimeUpdate}
        progress={progress}
        playing={playing}
        time={time}
      />
    </div>
  )
}

export default InstrumentalPlayerAudioControl;
