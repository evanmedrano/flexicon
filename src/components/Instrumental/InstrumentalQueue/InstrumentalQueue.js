import React from "react";

import { InstrumentalItem, InstrumentalTable } from "../";

function InstrumentalQueue(props) {
  const {
    currentInstrumental,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    handleQueueReset,
    playing,
    queue
  } = props;

  if (queue.length === 0) {
    return null;
  }

  const renderedInstrumentals = queue.map(instrumental => {
    const activeStyle = "instrumental-item__active";

    return (
      <InstrumentalItem
        key={instrumental.id}
        activeClass={instrumental === currentInstrumental ? activeStyle : ""}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        instrumental={instrumental}
        playing={playing}
        queueText={
          queue.includes(instrumental) ? "Remove from queue" : "Add to queue"
        }
      />
    );
  });

  return (
    <div className="instrumental-queue mt-5">
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>Next In Queue</h2>
        <hr className="border-bottom mb-4" />
        <button
          onClick={handleQueueReset}
          className="button button--outline button--round"
        >
          Clear
        </button>
      </div>
      <InstrumentalTable>{renderedInstrumentals}</InstrumentalTable>
    </div>
  );
}

export { InstrumentalQueue };
