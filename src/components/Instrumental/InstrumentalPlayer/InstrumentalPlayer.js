import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as unlikedBeat } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faHeart as likedBeat,
  faPlayCircle,
  faPauseCircle,
  faRandom,
  faRetweet,
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";

import { truncate } from "../../../utilities";

function InstrumentalPlayer(props) {
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
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const instrumentalAudio = useRef(null);
  const currentTime = useRef();
  const progressBar = useRef();
  const volumeBar = useRef();
  const dragImage = new Image(0,0)

  useEffect(() => {
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    if (playing) {
      currentTime.current = setInterval(() => {
        if (instrumentalAudio.current) {
          setTime(Math.floor(instrumentalAudio.current.currentTime));
          setPercentage((time / duration) * 100);
          progressBar.current.style.width = percentage + "%";
        }
      }, 500);
    } else {
      clearInterval(currentTime.current);
    }
    return () => clearInterval(currentTime.current);
  }, [playing, time, percentage]);

  useEffect(() => {
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

  const onInstrumentalPause = () => {
    handleInstrumentalPause();
    clearInterval(currentTime.current);
    setPercentage(Math.round((time / duration) * 100));
    progressBar.current.style.width = percentage + "%";
  };

  const onInstrumentalEnd = () => {
    setTime(0);
    handleInstrumentalEnding(instrumental);
  };

  const onNextInstrumental = () => {
    setTime(0);
    handleNextInstrumental();
  };

  const onPreviousInstrumental = () => {
    if (time > 0) {
      instrumentalAudio.current.currentTime = 0;
    } else {
      handlePreviousInstrumental();
    }
    setTime(0);
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
    setPercentage(update)
    setTime(timeUpdate)
  }

  const handleAudioSeekStart = event => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const bar = progressBar.current.getBoundingClientRect()
    if (event.clientY > bar.bottom || event.clientY < bar.top) {
      return
    }
  }

  const handleAudioSeek = event => {
    progressBar.current.style.transition = "0s";
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    const update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    const timeUpdate = Math.floor(update * duration / 100);
    if (update > 100) {
      progressBar.current.style.width = "100%";
      setTime(30)
      return
    } else if (update < 0) {
      progressBar.current.style.width = "0%";
      setTime(0)
      return
    }
    progressBar.current.style.width = update + "%";
    setPercentage(update)
    setTime(timeUpdate)
  }

  const handleAudioSeekEnd = event => {
    progressBar.current.style.transition = "width .6s ease";
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    let update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    let timeUpdate = Math.floor(update * duration / 100);
    progressBar.current.style.width = update + "%";
    if (update > 100) {
      progressBar.current.style.width = "100%";
      update = 100
      timeUpdate = 30;
    } else if (update < 0) {
      progressBar.current.style.width = "0%";
      update = 0
      timeUpdate = 0;
    }
    instrumentalAudio.current.currentTime = timeUpdate;
    setPercentage(update)
    setTime(timeUpdate)
  }

  const handleMuteToggle = () => {
    setMute(!mute)
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

  const handleVolumeSeekStart = event => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const bar = volumeBar.current.getBoundingClientRect()
    if (event.clientY > bar.bottom || event.clientY < bar.top) {
      return
    }
  }

  const handleVolumeSeek = event => {
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    const update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    const volumeUpdate = Math.round((seekLocation - leftBound) / containerWidth * 10) / 10;
    if (update > 100) {
      volumeBar.current.style.width = "100%";
      setVolume(1)
      return
    } else if (update < 0) {
      volumeBar.current.style.width = "0%";
      setVolume(0)
      return
    }
    volumeBar.current.style.width = update + "%";
    setVolume(volumeUpdate)
  }

  const handleVolumeSeekEnd = event => {
    const progressContainer = event.target.closest('.instrumental-player__draggable-container').getBoundingClientRect()
    const leftBound = Math.floor(progressContainer.left)
    const containerWidth = Math.floor(progressContainer.width)
    const seekLocation = Math.floor(event.clientX);
    let update = Math.floor((seekLocation - leftBound) / containerWidth * 100)
    let volumeUpdate = Math.round((seekLocation - leftBound) / containerWidth * 10) / 10;
    volumeBar.current.style.width = update + "%";
    if (update > 100) {
      volumeBar.current.style.width = "100%";
      update = 100
      volumeUpdate = 1;
    } else if (update < 0) {
      volumeBar.current.style.width = "0%";
      update = 0;
      volumeUpdate = 0;
    }
    instrumentalAudio.current.volume = volumeUpdate;
    setVolume(volume)
  }

  return (
    <div className="instrumental-player">
      <div className="instrumental-player__details">
        <span className="mr-4">{truncate(instrumental.title, 30)}</span>
        <FontAwesomeIcon icon={unlikedBeat} />
      </div>
      <div className="instrumental-player__controls">
        <div className="instrumental-player__buttons">
          <FontAwesomeIcon
            icon={faRandom}
            title={shuffling ? "Don't shuffle" : "Shuffle"}
            onClick={() => handleInstrumentalShuffle()}
            className={
              shuffling
                ? "instrumental-player__icon--active"
                : "" + "instrumental-player__icon"
            }
          />
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            title="Previous"
            onClick={() => onPreviousInstrumental()}
            className="instrumental-player__icon instrumental-player__prev-icon"
          />
          {playing ? (
            <FontAwesomeIcon
              icon={faPauseCircle}
              title="Pause"
              onClick={onInstrumentalPause}
              className="instrumental-player__icon instrumental-player__pause-icon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlayCircle}
              title="Play"
              onClick={() => handleInstrumentalPlay()}
              className="instrumental-player__icon instrumental-player__pause-icon"
            />
          )}
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            title="Next"
            onClick={() => onNextInstrumental()}
            className="instrumental-player__icon instrumental-player__next-icon"
          />
          <FontAwesomeIcon
            icon={faRetweet}
            title={looping ? "Don't repeat" : "Repeat"}
            onClick={handleInstrumentalLoop}
            className={
              looping
                ? "instrumental-player__icon--active"
                : "" + "instrumental-player__icon"
            }
          />
        </div>
        <div className="instrumental-player__time">
          <span>{time < 10 ? "0:0" + time : "0:" + time}</span>
          <div
            onMouseUp={handleAudioUpdate}
            id="audio-container"
            className="instrumental-player__draggable-container"
          >
            <div
              ref={progressBar}
              className="instrumental-player__draggable-bar"
            >
              <div
                draggable="true"
                onDragStart={handleAudioSeekStart}
                onDrag={handleAudioSeek}
                onDragEnd={handleAudioSeekEnd}
                id="audio-circle"
                className="instrumental-player__draggable-circle"
              >
              </div>
            </div>
          </div>
          <span>{"0:" + duration}</span>
        </div>
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
              onDragStart={handleVolumeSeekStart}
              onDrag={handleVolumeSeek}
              onDragEnd={handleVolumeSeekEnd}
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

export { InstrumentalPlayer };
