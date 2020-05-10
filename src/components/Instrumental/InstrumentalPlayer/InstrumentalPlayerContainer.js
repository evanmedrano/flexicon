import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";

import * as InstrumentalPlayer from './';

function InstrumentalPlayerContainer(props) {
  const {
    handleInstrumentalEnding,
    handleInstrumentalLoop,
    handleInstrumentalPause,
    handleInstrumentalPlay,
    handleInstrumentalSelect,
    handleInstrumentalShuffle,
    handleNextInstrumental,
    handlePreviousInstrumental,
    instrumental,
    looping,
    playing,
    shuffling
  } = props;

  const [duration, setDuration] = useState(30);
  const [mute, setMute] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const instrumentalAudio = useRef(null);
  const progressBar = useRef();
  const volumeBar = useRef();

  const dragImage = new Image(0,0)

  useEffect(() => {
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    if (mute) {
      setVolume(volume);
      instrumentalAudio.current.volume = 0;
      volumeBar.current.style.width = '0%';
    } else if (!mute && instrumentalAudio.current) {
      instrumentalAudio.current.volume = volume;
      volumeBar.current.style.width = volume * 100 + '%';
    }
  }, [mute, volume])

  if (!instrumental) {
    return null;
  }

  if (instrumentalAudio.current && playing === false) {
    instrumentalAudio.current.pause();
  }

  if (instrumentalAudio.current !== null && playing === true) {
    instrumentalAudio.current.play();
  }

  const onInstrumentalEnd = () => {
    setTime(0);
    handleInstrumentalEnding(instrumental);
  };


  if (looping) {
    instrumentalAudio.current.loop = true;
  } else if (looping && instrumentalAudio.current) {
    instrumentalAudio.current.loop = false;
  }

  const handleAudioUpdate = event => {
    progressBar.current.style.transition = "0s";
    const progressContainer = progressBar.current.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    const update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    const timeUpdate = Math.floor(update * duration / 100);
    const progressCircle = progressBar.current.querySelector('.instrumental-player__draggable-circle')
    if (update < 0 || event.target === progressCircle) {
      return
    }
    progressBar.current.style.width = update + "%";
    instrumentalAudio.current.currentTime = timeUpdate;
    setProgress(update)
    setTime(timeUpdate)
  }

  const handleStartOfSliderDrag = (event, slider) => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const bar = slider.current.getBoundingClientRect()
    if (event.clientY > bar.bottom || event.clientY < bar.top) {
      return
    }
  }

  const handleSliderDrag = (event, slider) => {
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    const percentage = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    const timeUpdate = Math.floor(percentage * duration / 100);
    const volumeUpdate = Math.round((seekLocation - leftBound) / containerWidth * 10) / 10;

    if (percentage > 100) {
      slider.current.style.width = "100%";
      slider === progressBar ? setTime(30) : setVolume(1);
      return
    } else if (percentage < 0) {
      slider.current.style.width = "0%";
      slider === progressBar ? setTime(0) : setVolume(0);
      return
    }

    slider.current.style.width = percentage + "%";

    if (slider === progressBar) {
      progressBar.current.style.transition = "width .0s ease";
      setProgress(percentage)
      setTime(timeUpdate)
    } else {
      setVolume(volumeUpdate)
    }
  }

  const handleEndOfSliderDrag = (event, slider) => {
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    let percentage = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    let timeUpdate = Math.floor(percentage * duration / 100);
    let volumeUpdate = Math.round((seekLocation - leftBound) / containerWidth * 10) / 10;

    slider.current.style.width = percentage + "%";

    if (percentage > 100) {
      slider.current.style.width = "100%";
      percentage = 100
      volumeUpdate = 1;
      timeUpdate = 30;
      slider === progressBar ? setTime(30) : setVolume(1);
    } else if (percentage < 0) {
      slider.current.style.width = "0%";
      percentage = 0;
      volumeUpdate = 0;
      timeUpdate = 0;
      slider === progressBar ? setTime(30) : setVolume(0);
    }

    if (slider === progressBar) {
      progressBar.current.style.transition = "width .6s ease";
      instrumentalAudio.current.currentTime = timeUpdate;
      setProgress(percentage)
      setTime(timeUpdate)
    } else {
      setVolume(volumeUpdate)
      instrumentalAudio.current.volume = volumeUpdate;
    }
  }

  const handleMuteToggle = () => {
    setMute(!mute)
  }

  const handleAudioProgress = () => {
    setTime(Math.floor(instrumentalAudio.current.currentTime));
    setProgress((time / duration) * 100);
    progressBar.current.style.width = (time / duration) * 100 + "%";
  }

  const handleTimeReset = () => {
    instrumentalAudio.current.currentTime = 0;
    setTime(0);
  }

  const handleVolumeUpdate = event  => {
    const progressContainer = volumeBar.current.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    const update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    const volumeUpdate = Math.round((seekLocation - leftBound) / containerWidth * 10) / 10;
    const progressCircle = volumeBar.current.querySelector('.instrumental-player__draggable-circle')
    if (volumeUpdate > 1 || event.target === progressCircle) {
      return
    }
    volumeBar.current.style.width = update + "%";
    instrumentalAudio.current.volume = volumeUpdate;
    setVolume(volumeUpdate)
  }

  const onInstrumentalPause = () => {
    handleInstrumentalPause();
    setProgress(Math.round((time / duration) * 100));
  };

  return (
    <div data-testid="instrumental-player" className="instrumental-player">
      <InstrumentalPlayer.Detail instrumental={instrumental} />
      <div className="instrumental-player__controls">
        <InstrumentalPlayer.AudioControl
          handlePreviousInstrumental={handlePreviousInstrumental}
          handleNextInstrumental={handleNextInstrumental}
          handleInstrumentalPause={handleInstrumentalPause}
          handleTimeReset={handleTimeReset}
          looping={looping}
          time={time}
          shuffling={shuffling}
          playing={playing}
          handleInstrumentalPlay={handleInstrumentalPlay}
          handleInstrumentalLoop={handleInstrumentalLoop}
          handleInstrumentalShuffle={handleInstrumentalShuffle}
        />
        <InstrumentalPlayer.TimeControl
          audioElement={instrumentalAudio}
          duration={duration}
          handleAudioProgress={handleAudioProgress}
          handleStartOfSliderDrag={handleStartOfSliderDrag}
          handleSliderDrag={handleSliderDrag}
          handleEndOfSliderDrag={handleEndOfSliderDrag}
          handleAudioUpdate={handleAudioUpdate}
          progress={progress}
          playing={playing}
          progressBar={progressBar}
          time={time}
        />
      </div>

      <div className="instrumental-player__volume-container">
        {mute ? (
          <FontAwesomeIcon
            icon={faVolumeMute}
            title="Unmute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faVolumeUp}
            title="Mute"
            onClick={handleMuteToggle}
            className="instrumental-player__icon"
          />
        )}
        <div
          onMouseUp={handleVolumeUpdate}
          className="instrumental-player__draggable-container"
          id="volume-container"
        >
          <div
            ref={volumeBar}
            className="instrumental-player__volume-bar"
          >
            <div
              draggable="true"
              onDragStart={event => handleStartOfSliderDrag(event, volumeBar)}
              onDrag={event => handleSliderDrag(event, volumeBar)}
              onDragEnd={event => handleEndOfSliderDrag(event, volumeBar)}
              id="volume-circle"
              className="instrumental-player__draggable-circle"
            >
            </div>
          </div>
        </div>
      </div>
      <audio
        autoPlay
        id="instrumental-audio"
        onEnded={onInstrumentalEnd}
        key={instrumental.id}
        ref={instrumentalAudio}
        onPlay={handleInstrumentalPlay}
        onPause={onInstrumentalPause}
      >
        <source
          src={instrumental.track || instrumental.preview}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export { InstrumentalPlayerContainer };
