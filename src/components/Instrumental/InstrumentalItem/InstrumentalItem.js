import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart as unlikedBeat,
  faPlayCircle,
  faPauseCircle
} from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as likedBeat,
  faEllipsisH,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { truncate } from '../../../utilities';

function InstrumentalItem(props) {
  const {
    activeClass,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    instrumental
  } = props;

  const onInstrumentalPause = event => {
    handleInstrumentalPause(instrumental);

    const currentActiveInstrumental = event.target.closest('tr');
    currentActiveInstrumental.classList.add("instrumental-item__paused");
  }

  return (
    <>
      <tr
        onDoubleClick={() => handleInstrumentalSelect(instrumental)}
        className={activeClass + " instrumental-item__row"}
      >
        <td className="text-center">
          <FontAwesomeIcon
            icon={faPlayCircle}
            onClick={() => handleInstrumentalSelect(instrumental)}
            className="instrumental-item__icon instrumental-item__play-icon"
          />
          <FontAwesomeIcon
            icon={faVolumeUp}
            className="instrumental-item__icon instrumental-item__speaker-icon"
          />
          <FontAwesomeIcon
            onClick={onInstrumentalPause}
            icon={faPauseCircle}
            className="instrumental-item__icon instrumental-item__pause-icon"
          />
        </td>
        <td className="instrumental-item__heart pl-3">
          <FontAwesomeIcon icon={unlikedBeat} />
        </td>
        <td className="pl-3 instrumental-item__title">
          <span>
            {truncate(instrumental.title, 40)}
          </span>
        </td>
        <td className="pl-3">
          <span className="instrumental-item__date-added">
            {moment(instrumental.created_at).fromNow()}
          </span>
        </td>
        <td className="pl-5 pr-3 text-center">
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={event => handleQueueAdd(instrumental)}
            title="More"
            className="instrumental-item__ellipsis"
          />
        </td>
      </tr>
    </>
  )
}

export { InstrumentalItem };
