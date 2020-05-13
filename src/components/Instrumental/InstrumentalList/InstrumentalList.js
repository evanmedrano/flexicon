import React from "react";

import { InstrumentalItem, InstrumentalTable } from "../";

function InstrumentalList(props) {
  const {
    currentInstrumental,
    error,
    filter,
    handleFilterReset,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    instrumentals,
    playing,
    queue
  } = props;

  if (error) {
    return (
      <h2 className="instrumental-table__error">
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
            <td colSpan="4" className="instrumental-table__no-filter">
              <span className="mr-2">No results for "{filter}".</span>
              <span
                onClick={handleFilterReset}
                className="instrumental-table__reset"
              >
                Remove Filter.
              </span>
            </td>
          </tr>
        </>
      );
    }
  };

  const instrumentalsList = filter ? filteredInstrumentals : instrumentals;

  const renderedInstrumentals = instrumentalsList.map(instrumental => {
    const activeStyle = "instrumental-item__active";

    return (
      <InstrumentalItem
        key={instrumental.id}
        activeClass={instrumental === currentInstrumental ? activeStyle : ""}
        instrumental={instrumental}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        playing={playing}
        queueText={
          queue.includes(instrumental) ? "Remove from queue" : "Add to queue"
        }
      />
    );
  });

  return (
    <InstrumentalTable heading="Up Next">
      {noFilteredInstrumentals()}
      {renderedInstrumentals}
    </InstrumentalTable>
  );
}

export { InstrumentalList };
