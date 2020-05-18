import React, { useEffect, useState } from "react";

import { getInstrumentals, getLikedInstrumentals } from "../../../api/instrumentals";
import { userSignedIn } from "../../../utilities";
import * as Instrumental from "../";

function InstrumentalList(props) {
  const {
    currentInstrumental,
    filter,
    handleFilterReset,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalsRequest,
    handleInstrumentalSelect,
    handleLikedInstrumentalsRequest,
    handleQueueAdd,
    handleQueueRemove,
    instrumentals,
    likedInstrumentals,
    playing,
    queue
  } = props;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getInstrumentals(
      response => {
        handleInstrumentalsRequest(response.data);
        setLoading(false);
      },
      error => {
        setError(error);
        setLoading(false);
      }
    );

    if (userSignedIn()) {
      getLikedInstrumentals(
        response => {
          handleLikedInstrumentalsRequest(response.data);
        },
        error => {
          setError(error);
        }
      );
    }
  }, []);

  if (error) {
    return (
      <h3 className="instrumental-table__error">
        There was an error loading the instrumentals
      </h3>
    );
  }

  const filteredInstrumentals = instrumentals.filter(instrumental => {
    return instrumental.title.toLowerCase().includes(filter.toLowerCase());
  });

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

  const instrumentalsList = filter ? filteredInstrumentals : instrumentals;

  const renderedInstrumentals = instrumentalsList.map(instrumental => {
    const activeStyle = "instrumental-item__active";
    const likedInstrumental = likedInstrumentals.some(likedInstrumental => {
      return likedInstrumental.title === instrumental.title
    })

    return (
      <Instrumental.ItemContainer
        key={instrumental.id}
        activeClass={instrumental === currentInstrumental ? activeStyle : ""}
        handleInstrumentalLike={handleInstrumentalLike}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueRemove={handleQueueRemove}
        instrumental={instrumental}
        likedInstrumental={likedInstrumental}
        playing={playing}
        queueText={
          queue.includes(instrumental) ? "Remove from queue" : "Add to queue"
        }
      />
    );
  });

  return (
    <div>
      <h3>{loading ? "Loading your instrumentals..." : ""}</h3>

      <Instrumental.Table heading="Up Next">
        {renderedInstrumentals}
      </Instrumental.Table>
    </div>
  );
}

export default InstrumentalList;
