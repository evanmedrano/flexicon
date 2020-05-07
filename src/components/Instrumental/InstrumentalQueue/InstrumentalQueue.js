import React from 'react';

import { InstrumentalList } from '../';

function InstrumentalQueue(props) {
  const {
    activeInstrumental,
    filter,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    handleQueueReset,
    playing,
    queue,
    queueInstrumentals
  } = props;

  if (queue.length === 0) {
    return null;
  }

  return (
    <div className="instrumental-queue">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>Next In Queue</h2>
        <hr className="border-bottom mb-4" />
        <button
          onClick={() => handleQueueReset()}
          className="button button--outline button--round"
        >
          Clear
        </button>
      </div>
      <InstrumentalList
        activeInstrumental={activeInstrumental}
        filter=''
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        instrumentals={queue}
        playing={playing}
        queueInstrumentals={queueInstrumentals}
      />
    </div>
  )
}

export { InstrumentalQueue };
