import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as unlikedBeat } from "@fortawesome/free-regular-svg-icons";
import { faHeart as likedBeat } from "@fortawesome/free-solid-svg-icons";

import { truncate } from "../../../../utilities";

function InstrumentalPlayerDetail({ instrumental }) {
  return (
    <div className="instrumental-player-detail">
      <span className="mr-4 instrumental-player-detail__title">
        {truncate(instrumental.title, 30)}
      </span>
      <FontAwesomeIcon icon={unlikedBeat} />
    </div>
  )
}

export default InstrumentalPlayerDetail;
