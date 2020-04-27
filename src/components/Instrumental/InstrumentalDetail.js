import React from 'react';

function InstrumentalDetail({ instrumental }) {
  if (!instrumental) {
    return <div>Waiting for your instrumental</div>
  }

  return (
    <div>
      <h2>Now playing: {instrumental.title}</h2>

      <video loop controls autoPlay key={instrumental.id}>
        <source src={instrumental.track || instrumental.preview} type="audio/mpeg" />
      </video>
    </div>
  )
}

export { InstrumentalDetail }
