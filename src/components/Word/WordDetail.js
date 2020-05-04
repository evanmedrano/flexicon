import React from 'react';

function WordDetail({ error, word, startWordLoop, stopWordLoop }) {
  if (error) {
    return (
      <h2>
        There was an error fetching a word
      </h2>
    )
  }

  return (
    <div>
      <h2 className="text-center">
        {word === null ? 'Finding your new word' : word}
      </h2>
      <button onClick={() => stopWordLoop()}>Stop</button>
      <button onClick={() => startWordLoop()}>Start</button>
    </div>
  )
}

export { WordDetail };
