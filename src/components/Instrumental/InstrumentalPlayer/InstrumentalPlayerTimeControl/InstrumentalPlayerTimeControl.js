import React, { useEffect, useRef } from 'react';

function InstrumentalPlayerTimeControl(props) {
  const {
    audioElement,
    duration,
    handleAudioProgress,
    handleStartOfSliderDrag,
    handleSliderDrag,
    handleEndOfSliderDrag,
    handleAudioUpdate,
    progress,
    playing,
    progressBar,
    time
  } = props;

  const dragImage = new Image(0,0);
  const audioTime = useRef();

  useEffect(() => {
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    if (playing) {
      audioTime.current = setInterval(() => {
        if (audioElement.current) {
          handleAudioProgress()
        }
      }, 100);
    } else {
      clearInterval(audioTime.current);
    }
    return () => clearInterval(audioTime.current);
  }, [playing, time, progress]);

  return (
    <div className="instrumental-player-time-control">
      <span>{time < 10 ? "0:0" + time : "0:" + time}</span>
      <div
        onMouseUp={handleAudioUpdate}
        id="audio-container"
        className="instrumental-player__draggable-container"
      >
        <div
          ref={progressBar}
          id="audio-progress-bar"
          className="instrumental-player__draggable-bar"
        >
          <div
            draggable="true"
            onDragStart={event => handleStartOfSliderDrag(event, progressBar)}
            onDrag={event => handleSliderDrag(event, progressBar)}
            onDragEnd={event => handleEndOfSliderDrag(event, progressBar)}
            id="audio-circle"
            className="instrumental-player__draggable-circle"
          >
          </div>
        </div>
      </div>
      <span className="instrumental-player__duration">
        {"0:" + duration}
      </span>
    </div>

  )

}

export default InstrumentalPlayerTimeControl;
