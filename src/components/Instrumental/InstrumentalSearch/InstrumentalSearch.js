import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function InstrumentalSearch({ handleFormSubmit, searchError }) {
  const [search, setSearch] = useState("");

  function handleInstrumentalSearch(event) {
    event.preventDefault();

    handleFormSubmit(search);
  }

  return (
    <div className="instrumental-search">
      <form onSubmit={handleInstrumentalSearch} className="position-relative">
        <h2 className="instrumental-search__error">
          {searchError ? searchError : ""}
        </h2>
        <FontAwesomeIcon
          icon={faSearch}
          className="instrumental-search__icon"
        />
        <input
          type="text"
          onChange={event => setSearch(event.target.value)}
          placeholder="Search for a beat"
          value={search}
          className="instrumental-search__input"
        />
      </form>
    </div>
  );
}

export { InstrumentalSearch };
