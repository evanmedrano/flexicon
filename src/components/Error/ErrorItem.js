import React from 'react';

function ErrorItem({ error }) {
  return (
    <>
      <li className="custom-alert__message">{error}</li>
    </>
  )
}

export { ErrorItem };
