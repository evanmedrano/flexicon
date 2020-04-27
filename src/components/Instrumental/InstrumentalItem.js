import React from 'react';

function InstrumentalItem({ instrumental, handleInstrumentalSelect }) {
  return (
    <div onClick={() => handleInstrumentalSelect(instrumental)}>
      <h2>
        {instrumental.title}
      </h2>
    </div>
  )
}

export { InstrumentalItem };
