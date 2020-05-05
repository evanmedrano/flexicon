import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import { InstrumentalItem } from "../";

function InstrumentalList(props) {
  const {
    error,
    instrumentals,
    handleInstrumentalPause,
    handleInstrumentalSelect
  } = props;

  const [filter, setFilter] = useState("");

  if (error) {
    return (
      <h2 className="instrumental-list__error">
        There was an error loading the instrumentals
      </h2>
    );
  }

  const resetFilter = () => {
    setFilter('');
  }

  const filteredInstrumentals = instrumentals.filter(instrumental => {
    return instrumental.title.toLowerCase().includes(filter.toLowerCase());
  });

  const noFilteredInstrumentals = () => {
    if (filteredInstrumentals.length === 0) {
      return (
        <>
          <tr>
            <td colSpan="4" className="instrumental-list__no-filter">
              <span className="mr-2">No results for "{filter}".</span>
              <span onClick={resetFilter} className="instrumental-list__reset">
                Remove Filter.
              </span>
            </td>
          </tr>
        </>
      )
    }
  }

  const filteredInstrumentalList = filteredInstrumentals.map(instrumental => {
    return (
      <InstrumentalItem
        key={instrumental.id}
        instrumental={instrumental}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalPause={handleInstrumentalPause}
      />
    )
  })

  const instrumentalsList = instrumentals.map(instrumental => {
    return (
      <InstrumentalItem
        key={instrumental.id}
        instrumental={instrumental}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalPause={handleInstrumentalPause}
      />
    );
  });

  return (
    <div>
      <div className="mt-5 mb-2 instrumental-list__filter-container">
        <input
          type="text"
          onChange={event => setFilter(event.target.value)}
          placeholder="Filter"
          value={filter}
          className="instrumental-list__filter"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="instrumental-list__search-icon"
        />
        <FontAwesomeIcon
          icon={faTimes}
          onClick={resetFilter}
          className="instrumental-list__close-icon"
        />
      </div>

      <table className="instrumental-list__table">
        <thead>
          <tr className="instrumental-list__table-headers">
            <th className="instrumental-list__play-header">
              <span className="invisible">Play</span>
            </th>
            <th className="instrumental-list__like-header">
              <span className="invisible">Like</span>
            </th>
            <th className="pl-3 instrumental-list__title-header">
              <span>
                Title
              </span>
            </th>
            <th className="pl-3 instrumental-list__calendar">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </th>
            <th>
              <span className="invisible">Options</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filter === '' ? instrumentalsList : filteredInstrumentalList}
          {noFilteredInstrumentals()}
        </tbody>
      </table>
    </div>
  );
}

export { InstrumentalList };
