import React, { useRef } from "react";

function InstrumentalDetail(props) {
  const {
    instrumental,
    nextInstrumental,
    handleInstrumentalEnding,
    playing
  } = props;

  const instrumentalAudio = useRef(null);

  if (!instrumental) {
    return <div>Waiting for your instrumental</div>;
  }

  if (playing === false) {
    instrumentalAudio.current.pause();
  }

  if (instrumentalAudio.current !== null && playing === true) {
    instrumentalAudio.current.play();
  }

  const setNextInstrumental = () => {
    handleInstrumentalEnding(instrumental);
  };

  return (
    <div>
      <h2>Now playing: {instrumental.title}</h2>
      <h2>
        {nextInstrumental === undefined ? " " : `Next up: ${nextInstrumental.title}`}
      </h2>

      <audio
        controls
        autoPlay
        id="instrumental-audio"
        onEnded={setNextInstrumental}
        key={instrumental.id}
        ref={instrumentalAudio}
      >
        <source
          src={instrumental.track || instrumental.preview}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export { InstrumentalDetail };
