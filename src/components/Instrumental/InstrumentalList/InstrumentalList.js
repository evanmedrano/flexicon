import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

import { InstrumentalItem } from "../";

function InstrumentalList(props) {
  const {
    activeInstrumental,
    error,
    filter,
    handleFilterReset,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    instrumentals
  } = props;

  if (error) {
    return (
      <h2 className="instrumental-list__error">
        There was an error loading the instrumentals
      </h2>
    );
  }

  const filteredInstrumentals = instrumentals.filter(instrumental => {
    return instrumental.title.toLowerCase().includes(filter.toLowerCase());
  });

  const noFilteredInstrumentals = () => {
    if (filter && filteredInstrumentals.length === 0) {
      return (
        <>
          <tr>
            <td colSpan="4" className="instrumental-list__no-filter">
              <span className="mr-2">No results for "{filter}".</span>
              <span
                onClick={() => handleFilterReset()}
                className="instrumental-list__reset"
              >
                Remove Filter.
              </span>
            </td>
          </tr>
        </>
      )
    }
  }

  const filteredInstrumentalList = filteredInstrumentals.map(instrumental => {
    const activeStyle = 'instrumental-item__active'

    return (
      <InstrumentalItem
        key={instrumental.id}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        instrumental={instrumental}
        activeClass={instrumental === activeInstrumental ? activeStyle : ''}
      />
    )
  })

  const instrumentalsList = instrumentals.map(instrumental => {
    const activeStyle = 'instrumental-item__active'

    return (
      <InstrumentalItem
        key={instrumental.id}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        instrumental={instrumental}
        activeClass={instrumental === activeInstrumental ? activeStyle : ''}
      />
    );
  });

  return (
    <div className="instrumental-list">
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
        <tbody className="instrumental-list__tbody">
          {filter ? filteredInstrumentalList : instrumentalsList}
          {noFilteredInstrumentals()}
        </tbody>
      </table>
    </div>
  );
}

export { InstrumentalList };
