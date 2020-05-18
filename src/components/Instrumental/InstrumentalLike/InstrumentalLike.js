import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstrumentalLike(params) {
  const {
    currentInstrumental,
    likedInstrumental,
    handleInstrumentalLike
  } = params;

  return (
    <>
      {likedInstrumental ? (
        <FontAwesomeIcon
          icon="heart"
        />
      ) : (
        <FontAwesomeIcon
          icon={["far", "heart"]}
          onClick={() => handleInstrumentalLike(currentInstrumental)}
        />
      )}
    </>
  );
}

export default InstrumentalLike;
