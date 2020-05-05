import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlikedBeat } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as likedBeat,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { truncate } from '../../../utilities';

function InstrumentalItem({ instrumental, handleInstrumentalSelect }) {
  return (
    <>
      <tr className="instrumental-item__row">
        <td className="instrumental-item__heart pl-3">
          <FontAwesomeIcon icon={unlikedBeat} />
        </td>
        <td
          onClick={() =>
          handleInstrumentalSelect(instrumental)}
          className="pl-4 instrumental-item__title"
        >
          <span>
            {truncate(instrumental.title, 40)}
          </span>
        </td>
        <td
          className="pl-4"
        >
          <span className="instrumental-item__date-added">
            {moment(instrumental.created_at).fromNow()}
          </span>
        </td>
        <td className="pl-5 pr-3">
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="instrumental-item__ellipsis"
          />
        </td>
      </tr>
    </>
  )
}

export { InstrumentalItem };
