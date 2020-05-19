import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { truncate } from "../../../utilities";
import InstrumentalLike from "../InstrumentalLike/InstrumentalLike";

function InstrumentalItem(props) {
  const {
    addSelectedClass,
    baseClass,
    activeClass,
    dropdownNode,
    handleDropdownToggle,
    handleInstrumentalDislike,
    handleInstrumentalLike,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueue,
    handleQueueAdd,
    handleQueueRemove,
    instrumental,
    likedInstrumental,
    playing,
    rowNode,
    queueText
  } = props;

  return (
    <>
      <tr
        onClick={addSelectedClass}
        onDoubleClick={() => handleInstrumentalSelect(instrumental)}
        ref={rowNode}
        id={`${baseClass}__row-` + instrumental.id}
        className={activeClass + ` ${baseClass}__row`}
      >
        <td className="text-center">
          {playing && instrumental ? (
            <>
              <FontAwesomeIcon
                icon="pause-circle"
                onClick={handleInstrumentalPause}
                className={`${baseClass}__icon ${baseClass}__pause-icon`}
              />
              <FontAwesomeIcon
                icon="volume-up"
                className={`${baseClass}__icon ${baseClass}__speaker-icon`}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon="play-circle"
                onClick={() => handleInstrumentalSelect(instrumental)}
                className={`${baseClass}__icon ${baseClass}__active-play-icon`}
              />
              <FontAwesomeIcon
                icon="music"
                className={`${baseClass}__icon ${baseClass}__active-note-icon`}
              />
            </>
          )}
          <FontAwesomeIcon
            icon="music"
            className={`${baseClass}__icon ${baseClass}__note-icon`}
          />
          <FontAwesomeIcon
            icon="play-circle"
            onClick={() => handleInstrumentalSelect(instrumental)}
            className={`${baseClass}__icon ${baseClass}__play-icon`}
          />
        </td>
        <td className={`${baseClass}__heart pl-3`}>
          <InstrumentalLike
            currentInstrumental={instrumental}
            handleInstrumentalDislike={handleInstrumentalDislike}
            handleInstrumentalLike={handleInstrumentalLike}
            likedInstrumental={likedInstrumental}
          />
        </td>
        <td className={`pl-3 ${baseClass}__title`}>
          <span>{truncate(instrumental.title, 40)}</span>
        </td>
        <td className={`${baseClass}__date-added-container` + " pl-3"}>
          <span className={`${baseClass}__date-added`}>
            {moment(instrumental.created_at).fromNow()}
          </span>
        </td>
        <td
          onClick={handleDropdownToggle}
          id={`${baseClass}__dropdown-container`}
          className="pl-5 pr-3 text-center position-relative"
        >
          <FontAwesomeIcon
            icon="ellipsis-h"
            title="More"
            className={`${baseClass}__ellipsis`}
          />
          <div ref={dropdownNode} className={`${baseClass}__dropdown d-none`}>
            <ul className={`${baseClass}__dropdown-list`}>
              <li
                onClick={handleQueue}
                className={`${baseClass}__dropdown-item`}
              >
                <span>{queueText}</span>
              </li>
              <li className={`${baseClass}__dropdown-item mb-2`}>
                {likedInstrumental ? (
                  <span onClick={() => handleInstrumentalDislike(instrumental)}>
                    Remove from your Liked Instrumentals
                  </span>
                ) : (
                  <span onClick={() => handleInstrumentalLike(instrumental)}>
                    Save to your Liked Instrumentals
                  </span>
                )}
              </li>
              <hr />
              <li className={`${baseClass}__dropdown-item`}>
                <span>Remove from this Playlist</span>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
}

export default InstrumentalItem ;
