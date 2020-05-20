import React from 'react';

function WordDetail(props) {
  const { error, handleWordSkip, word, startWordLoop, stopWordLoop } = props;

  if (error) {
    return (
      <h2>
        There was an error fetching a word
      </h2>
    )
  }

  return (
    <div>
      <h2>Current word</h2>
      <br />
      <h2 className="text-center">
        {word === null ? 'Finding your new word' : word}
      </h2>
      <button onClick={stopWordLoop}>Stop</button>
      <button onClick={startWordLoop}>Start</button>
      <button onClick={handleWordSkip}>Skip</button>
    </div>
  )
}

export default WordDetail;
