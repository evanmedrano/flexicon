import React, { useState } from "react";

function InstrumentalSearch(props) {
  const [search, setSearch] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    props.handleFormSubmit(search);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h2>
          {props.error ? "No luck finding a track" : "Search for a track below"}
        </h2>
        <input
          type="text"
          onChange={event => setSearch(event.target.value)}
          value={search}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export { InstrumentalSearch };
