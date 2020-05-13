import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstrumentalTable({ children, heading }) {
  return (
    <div>
      <h2>{heading}</h2>
      <hr className="border-bottom mb-4" />
      <table className="instrumental-table">
        <thead>
          <tr className="instrumental-table__table-headers">
            <th className="instrumental-table__play-header">
              <span className="invisible">Play</span>
            </th>
            <th className="instrumental-table__like-header">
              <span className="invisible">Like</span>
            </th>
            <th
              className="pl-3
                                                                                                                                    instrumental-table__title-header"
            >
              <span>Title</span>
            </th>
            <th
              className="pl-3
                                                                                                                                                                          instrumental-table__calendar"
            >
              <FontAwesomeIcon icon={["far", "calendar-alt"]} />
            </th>
            <th>
              <span className="invisible">Options</span>
            </th>
          </tr>
        </thead>
        <tbody className="instrumental-table__tbody">{children}</tbody>
      </table>
    </div>
  );
}

export { InstrumentalTable };
