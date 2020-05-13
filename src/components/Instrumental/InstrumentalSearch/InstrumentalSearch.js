import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import rails from '../../../apis/rails';

function InstrumentalSearch({ handleInstrumentalSelect }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault()
    setLoading(true);

    rails
      .get(`instrumentals/${search}`)
      .then(response => {
        if (response.data.data) {
          handleInstrumentalSelect(response.data.data[0]);
          setError(null);
          setLoading(false);
        } else {
          setError(response.data.error);
          setLoading(false);
        }
      })
  };


  return (
    <div className="instrumental-search">
      <form onSubmit={handleFormSubmit} className="position-relative">
        <h3 className="instrumental-search__error">
          {error ? error : ""}
        </h3>
        <h3>
          {loading ? "Searching for your instrumental..." : ""}
        </h3>
        <FontAwesomeIcon icon="search" className="instrumental-search__icon" />
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

export default InstrumentalSearch;
