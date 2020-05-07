import React, { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as unlikedBeat,
  faPlayCircle,
  faPauseCircle
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as likedBeat,
  faEllipsisH,
  faMusic,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { truncate } from "../../../utilities";

function InstrumentalItem(props) {
  const {
    activeClass,
    activeInstrumental,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    instrumental,
    playing,
    queueText
  } = props;

  const dropdownNode = useRef();
  const rowNode = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = event => {
    if (dropdownNode.current.contains(event.target)) {
      return;
    }

    if (
      !dropdownNode.current.classList.contains("d-none") &&
      !rowNode.current.contains(event.target)
    ) {
      dropdownNode.current.classList.add("d-none");
    }

    rowNode.current.classList.remove("no-hover");
    rowNode.current.classList.remove("instrumental-item__selected");
  };

  const handleDropdownToggle = event => {
    dropdownNode.current.classList.toggle("d-none");
    handleHoverOnRows();
  };

  const handleHoverOnRows = () => {
    const instrumentalRows = document.querySelectorAll(
      ".instrumental-item__row"
    );

    if (!dropdownNode.current.classList.contains("d-none")) {
      instrumentalRows.forEach(instrumentalRow => {
        if (!instrumentalRow.contains(dropdownNode.current)) {
          instrumentalRow.classList.add("no-hover");
        }
      });
    } else {
      instrumentalRows.forEach(instrumentalRow => {
        instrumentalRow.classList.remove("no-hover");
      });
    }
  };

  const onInstrumentalPause = () => {
    handleInstrumentalPause();

    rowNode.current.classList.add("instrumental-item__paused");
    rowNode.current.classList.remove("instrumental-item__active");
  };

  const onInstrumentalPlay = () => {
    handleInstrumentalSelect(instrumental);

    rowNode.current.classList.remove("instrumental-item__paused");
    rowNode.current.classList.add("instrumental-item__active");
  };

  const handleQueue = () => {
    if (queueText === 'Remove from queue') {
      handleQueueRemove(instrumental);
    } else {
      handleQueueAdd(instrumental);
    }
  }

  const addSelectedClass = () => {
    rowNode.current.classList.toggle('instrumental-item__selected');
  }

  return (
    <>
      <tr
        onClick={addSelectedClass}
        onDoubleClick={() => handleInstrumentalSelect(instrumental)}
        ref={rowNode}
        className={activeClass + " instrumental-item__row"}
      >
        <td className="text-center">
          {playing && activeInstrumental ? (
            <>
              <FontAwesomeIcon
                icon={faPauseCircle}
                onClick={onInstrumentalPause}
                className="instrumental-item__icon instrumental-item__pause-icon"
              />
              <FontAwesomeIcon
                icon={faVolumeUp}
                className="instrumental-item__icon instrumental-item__speaker-icon"
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faPlayCircle}
                onClick={onInstrumentalPlay}
                className="instrumental-item__icon instrumental-item__active-play-icon"
              />
              <FontAwesomeIcon
                icon={faMusic}
                className="instrumental-item__icon instrumental-item__active-note-icon"
              />
            </>
          )}
          <FontAwesomeIcon
            icon={faMusic}
            className="instrumental-item__icon instrumental-item__note-icon"
          />
          <FontAwesomeIcon
            icon={faPlayCircle}
            onClick={onInstrumentalPlay}
            className="instrumental-item__icon instrumental-item__play-icon"
          />
        </td>
        <td className="instrumental-item__heart pl-3">
          <FontAwesomeIcon icon={unlikedBeat} />
        </td>
        <td className="pl-3 instrumental-item__title">
          <span>{truncate(instrumental.title, 40)}</span>
        </td>
        <td className="pl-3">
          <span className="instrumental-item__date-added">
            {moment(instrumental.created_at).fromNow()}
          </span>
        </td>
        <td
          onClick={handleDropdownToggle}
          id="instrumental-item__dropdown-container"
          className="pl-5 pr-3 text-center position-relative"
        >
          <FontAwesomeIcon
            icon={faEllipsisH}
            title="More"
            className="instrumental-item__ellipsis"
          />
          <div
            ref={dropdownNode}
            className="instrumental-item__dropdown d-none"
          >
            <ul className="instrumental-item__dropdown-list">
              <li
                onClick={handleQueue}
                className="instrumental-item__dropdown-item"
              >
                <span>{queueText}</span>
              </li>
              <li className="instrumental-item__dropdown-item mb-2">
                <span>Save to your Liked Instrumentals</span>
              </li>
              <hr />
              <li className="instrumental-item__dropdown-item">
                <span>Remove from this Playlist</span>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
}

export { InstrumentalItem };
