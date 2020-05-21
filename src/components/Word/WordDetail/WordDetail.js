import React from 'react';

function WordDetail(props) {
  const {
    error,
    handleWordSkip,
    startWordLoop,
    stopWordLoop,
    word,
    wordMatch
  } = props;

  if (error) {
    return (
      <h2>
        There was an error fetching a word
      </h2>
    )
  }

  return (
    <div className="word-detail">
      <h2>Current word</h2>
      <br />
      <h2 className={wordMatch ? "word-detail__match" : "word-detail__word"}>
        {word === null ? 'Finding your new word' : word}
      </h2>
      <button onClick={stopWordLoop}>Stop</button>
      <button onClick={startWordLoop}>Start</button>
      <button onClick={handleWordSkip}>Skip</button>
    </div>
  )
}

export default WordDetail;
