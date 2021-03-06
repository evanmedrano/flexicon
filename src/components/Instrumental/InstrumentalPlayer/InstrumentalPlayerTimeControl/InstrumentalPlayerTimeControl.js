import React, { useEffect, useRef } from 'react';

import InstrumentalPlayerSlider from '../InstrumentalPlayerSlider/InstrumentalPlayerSlider';

function InstrumentalPlayerTimeControl(props) {
  const {
    audioElement,
    duration,
    handleAudioDrag,
    handleAudioProgress,
    handleTimeUpdate,
    playing,
    progress,
    time,
  } = props;

  const audioTime = useRef();
  const progressBar = useRef();

  useEffect(() => {
    if (playing) {
      audioTime.current = setInterval(() => {
        if (audioElement.current) {
          handleAudioProgress()
          progressBar.current.style.width = progress + "%";
        }
      }, 100);
    } else {
      clearInterval(audioTime.current);
    }
    return () => clearInterval(audioTime.current);
  }, [playing, time, progress]);

  return (
    <div className="instrumental-player-time-control">
      <span>
        {time < 10 ? "0:0" + time : "0:" + time}
      </span>
      <InstrumentalPlayerSlider
        handleAudioDrag={handleAudioDrag}
        handleTimeUpdate={handleTimeUpdate}
        slider={progressBar}
        sliderControl="time"
      />
      <span className="instrumental-player__duration">
        {"0:" + duration}
      </span>
    </div>

  )

}

export default InstrumentalPlayerTimeControl;
