import React from 'react';

import { truncate } from "../../../../utilities";
import InstrumentalLike from "../../InstrumentalLike/InstrumentalLike";

function InstrumentalPlayerDetail(props) {
  const {
    currentInstrumental,
    likedInstrumental,
    handleInstrumentalLike
  } = props;

  return (
    <div className="instrumental-player-detail">
      <span className="mr-4 instrumental-player-detail__title">
        {truncate(currentInstrumental.title, 30)}
      </span>
      <InstrumentalLike
        currentInstrumental={currentInstrumental}
        likedInstrumental={likedInstrumental}
        handleInstrumentalLike={handleInstrumentalLike}
      />
    </div>
  )
}

export default InstrumentalPlayerDetail;
