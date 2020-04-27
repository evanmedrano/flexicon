import React from 'react';

function Word({ error, word, startWordLoop, stopWordLoop }) {
  if (error) {
    return <div>There was an error fetching a word</div>
  }

  return (
    <div>
      <h1 className="text-center">
        {word === null ? 'Finding your new word' : word}
      </h1>
      <button onClick={() => stopWordLoop()}>Stop</button>
      <button onClick={() => startWordLoop()}>Start</button>
    </div>
  )
}

export { Word };
