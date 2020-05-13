import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { truncate } from "../../../../utilities";

function InstrumentalPlayerDetail({ currentInstrumental }) {
  return (
    <div className="instrumental-player-detail">
      <span className="mr-4 instrumental-player-detail__title">
        {truncate(currentInstrumental.title, 30)}
      </span>
      <FontAwesomeIcon icon={['far', 'heart']} />
    </div>
  )
}

export default InstrumentalPlayerDetail;
