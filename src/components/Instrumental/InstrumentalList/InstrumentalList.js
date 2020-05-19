import React, { useEffect, useState } from "react";

import { getInstrumentals, getLikedInstrumentals } from "../../../api/instrumentals";
import { userSignedIn } from "../../../utilities";
import * as Instrumental from "../";

function InstrumentalList(props) {
  const {
    currentInstrumental,
    filter,
    handleFilterReset,
    handleInstrumentalDislike,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalsRequest,
    handleInstrumentalSelect,
    handleLikedInstrumentalsRequest,
    handleQueueAdd,
    handleQueueRemove,
    instrumentals,
    instrumentalsList,
    likedInstrumentals,
    playing,
    showAllInstrumentals,
    showLikedInstrumentals,
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

  const filteredInstrumentals = instrumentalsList.filter(instrumental => {
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
  }

  const chosenList = filter ? filteredInstrumentals : instrumentalsList;

  const renderedInstrumentals = chosenList.map(instrumental => {
    const activeStyle = "instrumental-item__active";
    const likedInstrumental = likedInstrumentals.some(likedInstrumental => {
      return likedInstrumental.title === instrumental.title
    })

    return (
      <Instrumental.ItemContainer
        key={instrumental.id}
        activeClass={instrumental === currentInstrumental ? activeStyle : ""}
        handleInstrumentalDislike={handleInstrumentalDislike}
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

  const all = instrumentalsList === instrumentals ? "all" : ""
  const liked = instrumentalsList === likedInstrumentals ? "liked" : ""

  return (
    <div>
      <h3>{loading ? "Loading your instrumentals..." : ""}</h3>

      <div className="text-right base-font-size mt-4">
        <span
          onClick={showAllInstrumentals}
          className={`instrumental-list__${all}` + " instrumental-list__playlist"}
        >
          All instrumentals
        </span>
        <span
          className={`instrumental-list__${liked}` + " ml-4 instrumental-list__playlist"}
          onClick={showLikedInstrumentals}
        >
          Liked instrumentals
        </span>
      </div>

      <Instrumental.Table heading="Up Next">
        {noFilteredInstrumentals()}
        {renderedInstrumentals}
      </Instrumental.Table>
    </div>
  );
}

export default InstrumentalList;
