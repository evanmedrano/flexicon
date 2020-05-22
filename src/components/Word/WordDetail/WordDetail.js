import React from 'react';

function WordDetail(props) {
  const {
    error,
    handleWordSkip,
    looping,
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
      <h2 className="word-detail__headline mb-4">
        Current word
        <span className="word-detail__word-hover ml-2">- {word}</span>
      </h2>

      <div className="word-detail__word-container">
        <h2 className={wordMatch ? "word-detail__match" : "word-detail__word"}>
          {word === null ? 'Finding your new word' : word}
        </h2>

        <div className="word-detail__buttons">
          {looping ? (
            <div className="d-flex flex-column">
              <button
                onClick={handleWordSkip}
                className="button button--pink button--round mb-3"
              >
                New Word
              </button>
              <button
                onClick={stopWordLoop}
                className="button button--red button--round"
              >
                Stop Looping
              </button>
            </div>
          ) : (
            <button
              onClick={startWordLoop}
              className="button button--primary button--round"
            >
              Loop Words
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default WordDetail;
