import React, { useEffect, useRef } from 'react';

import InstrumentalPlayerSlider from '../InstrumentalPlayerSlider/InstrumentalPlayerSlider';

function InstrumentalPlayerTimeControl(props) {
  const {
    audioElement,
    duration,
    handleAudioProgress,
    playing,
    progress,
    time,
    updateAudioTime
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

  const handleTimeUpdate = update => {
    audioElement.current.currentTime = update * duration;
  }

  const handleAudioDrag = dragLocation => {
    let result = Math.floor(dragLocation * duration);

    if (result > 30) {
      result = 30;
    } else if (result < 0) {
      result = 0;
    }

    updateAudioTime(result);
  }

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
