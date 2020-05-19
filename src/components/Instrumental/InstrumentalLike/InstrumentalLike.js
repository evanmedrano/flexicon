import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstrumentalLike(params) {
  const {
    currentInstrumental,
    likedInstrumental,
    handleInstrumentalDislike,
    handleInstrumentalLike
  } = params;

  return (
    <>
      {likedInstrumental ? (
        <>
          <FontAwesomeIcon
            icon="heart"
            className="instrumental-like__solid-heart"
            onClick={() => handleInstrumentalDislike(currentInstrumental)}
          />
          <FontAwesomeIcon
            icon="times"
            className="instrumental-like__delete"
            onClick={() => handleInstrumentalDislike(currentInstrumental)}
          />
        </>
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
