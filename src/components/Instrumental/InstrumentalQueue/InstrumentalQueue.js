import React from 'react';

import { InstrumentalList } from '../';

function InstrumentalQueue(props) {
  const {
    activeInstrumental,
    filter,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueReset,
    queue
  } = props;

  if (queue.length === 0) {
    return null;
  }

  return (
    <div className="instrumental-queue">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>Next In Queue</h2>
        <button
          onClick={() => handleQueueReset()}
          className="button button--outline button--round"
        >
          Clear
        </button>
      </div>
      <InstrumentalList
        activeInstrumental={activeInstrumental}
        filter={filter}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        instrumentals={queue}
      />
    </div>
  )
}

export { InstrumentalQueue };
