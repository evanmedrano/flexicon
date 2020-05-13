import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstrumentalFilter(props) {
  const { filter, handleInstrumentalFilter, handleFilterReset } = props;

  return (
    <div className="mt-5 mb-2 instrumental-filter__filter-container">
      <input
        type="text"
        onChange={event => handleInstrumentalFilter(event.target.value)}
        placeholder="Filter"
        value={filter}
        className="instrumental-filter__filter"
      />
      <FontAwesomeIcon
        icon="search"
        className="instrumental-filter__search-icon"
      />
      <FontAwesomeIcon
        icon="times"
        onClick={() => handleFilterReset()}
        className="instrumental-filter__close-icon"
      />
    </div>
  )
}

export default InstrumentalFilter ;
