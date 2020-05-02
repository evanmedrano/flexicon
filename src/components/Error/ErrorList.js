import React from 'react';

import { ErrorItem } from './ErrorItem';

function ErrorList({ errors }) {
  const errorMessages = errors.map(error => {
    return <ErrorItem key={error} error={error} />
  })

  return (
    <div className={errors.length !== 0 ? "custom-alert custom-alert--danger" : ""}>
      <ul className="custom-alert__list">
        {errorMessages}
      </ul>
    </div>
  )
}

export { ErrorList };
