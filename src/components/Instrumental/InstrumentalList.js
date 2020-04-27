import React from 'react';
import { InstrumentalItem } from './InstrumentalItem';

function InstrumentalList({ error, instrumentals, handleInstrumentalSelect }) {
  if (error) {
    return <h2>There was an error fetching the instrumentals</h2>
  }

  const instrumentalsList = instrumentals.map(instrumental => {
    return (
      <InstrumentalItem
        key={instrumental.id}
        instrumental={instrumental}
        handleInstrumentalSelect={handleInstrumentalSelect}
      />
    )
  })

  return <div>{instrumentalsList}</div>
}

export { InstrumentalList };
