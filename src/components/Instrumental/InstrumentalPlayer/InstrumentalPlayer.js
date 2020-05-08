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
  faRetweet
} from "@fortawesome/free-solid-svg-icons";

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
  const [time, setTime] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const instrumentalAudio = useRef(null);
  const currentTime = useRef();
  const progressBar = useRef();

  useEffect(() => {
    if (playing) {
      currentTime.current = setInterval(() => {
        setTime(Math.floor(instrumentalAudio.current.currentTime));
        setPercentage(time / duration * 100);
        progressBar.current.style.width =  percentage + '%'
      }, 500);
    } else {
      clearInterval(currentTime.current)
    }
    return () => clearInterval(currentTime.current);
  }, [playing, time, percentage])

  if (!instrumental) {
    return null;
  }

  if (playing === false) {
    instrumentalAudio.current.pause();
  }

  if (instrumentalAudio.current !== null && playing === true) {
    instrumentalAudio.current.play();
  }

  const onInstrumentalPause = () => {
    handleInstrumentalPause();
    clearInterval(currentTime.current);
    setPercentage(Math.round(time / duration * 100));
    progressBar.current.style.width =  percentage + '%'
  };

  const onInstrumentalEnd = () => {
    setTime(0);
    handleInstrumentalEnding(instrumental);
  };

  const onNextInstrumental = () => {
    setTime(0);
    handleNextInstrumental();
  }

  const onPreviousInstrumental = () => {
    if (time > 0) {
      instrumentalAudio.current.currentTime = 0;
    } else {
      handlePreviousInstrumental();
    }
    setTime(0);
  }

  if (looping) {
    instrumentalAudio.current.loop = true;
  } else if (looping && instrumentalAudio.current) {
    instrumentalAudio.current.loop = false;
  }

  return (
    <div className="instrumental-player">
      <div className="instrumental-player__details">
        <span className="mr-4">{instrumental.title}</span>
        <FontAwesomeIcon icon={unlikedBeat} />
      </div>
      <div className="instrumental-player__controls">
        <div className="instrumental-player__buttons">
          <FontAwesomeIcon
            icon={faRandom}
            onClick={() => handleInstrumentalShuffle()}
            style={{ color: shuffling ? 'hsl(203,90%,65%)' : 'hsl(149,8%,61%)' }}
            className="instrumental-player__icon instrumental-player__rand-icon"
          />
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            onClick={() => onPreviousInstrumental()}
            className="instrumental-player__icon instrumental-player__prev-icon"
          />
          {playing ? (
            <FontAwesomeIcon
              icon={faPauseCircle}
              onClick={onInstrumentalPause}
              className="instrumental-player__icon instrumental-player__pause-icon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlayCircle}
              onClick={() => handleInstrumentalPlay()}
              className="instrumental-player__icon instrumental-player__pause-icon"
            />
          )}
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            onClick={() => onNextInstrumental()}
            className="instrumental-player__icon instrumental-player__next-icon"
          />
          <FontAwesomeIcon
            icon={faRetweet}
            onClick={handleInstrumentalLoop}
            style={{ color: looping ? 'hsl(203,90%,65%)' : 'hsl(149,8%,61%)' }}
            className="instrumental-player__icon instrumental-player__repeat-icon"
          />
        </div>
        <div className="instrumental-player__time">
          <span>
            {time < 10 ? "0:0" + time : "0:" + time}
          </span>
          <div className="instrumental-player__progress-bar">
            <div
              ref={progressBar}
              className="instrumental-player__progress"
            >
            </div>
          </div>
          <span>{"0:" + duration}</span>
        </div>
      </div>
      <audio
        autoPlay
        controls
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
