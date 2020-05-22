import React from "react";

import * as Instrumental from "../";

function InstrumentalDetail(props) {
  const {
    currentInstrumental,
    handleInstrumentalDislike,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    isInstrumentalLiked,
    playing,
    queue
  } = props;

  if (!currentInstrumental) {
    return (
      <h4 className="mt-5 text-center">
        Please select an instrumental to get started
      </h4>
    );
  }

  return (
    <div className="mt-5 mt-lg-0">
      <Instrumental.Table heading="Now Playing">
        <Instrumental.ItemContainer
          activeClass="instrumental-item__active"
          handleInstrumentalDislike={handleInstrumentalDislike}
          handleInstrumentalLike={handleInstrumentalLike}
          handleInstrumentalPause={handleInstrumentalPause}
          handleInstrumentalSelect={handleInstrumentalSelect}
          handleQueueAdd={handleQueueAdd}
          handleQueueRemove={handleQueueRemove}
          instrumental={currentInstrumental}
          likedInstrumental={isInstrumentalLiked()}
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
