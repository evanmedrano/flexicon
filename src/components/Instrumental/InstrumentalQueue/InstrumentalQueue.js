import React from "react";

import * as Instrumental from "../";

function InstrumentalQueue(props) {
  const {
    currentInstrumental,
    handleInstrumentalDislike,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    handleQueueReset,
    likedInstrumentals,
    playing,
    queue
  } = props;

  if (queue.length === 0) {
    return null;
  }

  const renderedInstrumentals = queue.map(instrumental => {
    const activeStyle = "instrumental-item__active";
    const likedInstrumental = likedInstrumentals.some(likedInstrumental => {
      return likedInstrumental.title === instrumental.title;
    });


    return (
      <Instrumental.ItemContainer
        key={instrumental.id}
        activeClass={instrumental === currentInstrumental ? activeStyle : ""}
        handleInstrumentalDislike={handleInstrumentalDislike}
        handleInstrumentalLike={handleInstrumentalLike}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        instrumental={instrumental}
        likedInstrumental={likedInstrumental}
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
      <Instrumental.Table>{renderedInstrumentals}</Instrumental.Table>
    </div>
  );
}

export default InstrumentalQueue;
