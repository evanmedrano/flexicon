import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

import { InstrumentalList } from "../";

function InstrumentalDetail(props) {
  const {
    activeInstrumental,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    instrumental,
    playing,
    queueInstrumentals
  } = props;

  return (
    <div>
      <InstrumentalList
        activeClass="instrumental-item__active"
        activeInstrumental={activeInstrumental}
        filter=''
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        heading="Now Playing"
        instrumental={instrumental}
        instrumentals={[]}
        playing={playing}
        queueInstrumentals={queueInstrumentals}
      />
      <h4 className="mt-3 ml-4">
        {!instrumental ? "Please select an instrumental to get started." : ""}
      </h4>
    </div>
  );
}

export { InstrumentalDetail };
