import React from "react";

import * as Instrumental from "../";

function InstrumentalDetail(props) {
  const {
    currentInstrumental,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    playing,
    queue
  } = props;

  if (!currentInstrumental) {
    return (
      <h4 className="mt-3 ml-4">
        Please select an instrumental to get started
      </h4>
    );
  }

  return (
    <div>
      <Instrumental.Table heading="Now Playing">
        <Instrumental.ItemContainer
          activeClass="instrumental-item__active"
          handleInstrumentalPause={handleInstrumentalPause}
          handleInstrumentalSelect={handleInstrumentalSelect}
          handleQueueAdd={handleQueueAdd}
          handleQueueRemove={handleQueueRemove}
          instrumental={currentInstrumental}
          playing={playing}
          queueText={
            queue.includes(currentInstrumental)
              ? "Remove from queue"
              : "Add to queue"
          }
        />
      </Instrumental.Table>
    </div>
  );
}

export default InstrumentalDetail ;
