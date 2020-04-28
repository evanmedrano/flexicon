import React from "react";

function InstrumentalDetail({
  instrumental,
  nextInstrumental,
  handleAudioEnding
}) {
  if (!instrumental) {
    return <div>Waiting for your instrumental</div>;
  }

  const audio = document.querySelector("#instrumental-audio");

  const setNextInstrumental = () => {
    handleAudioEnding(instrumental);
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
