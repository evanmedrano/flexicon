import React from "react";

function WordList(props) {
  const {
    handleWordRepeat,
    matchedWords,
    previousWords,
    skippedWords,
    word
  } = props;

  if (previousWords.length === 0) {
    return null;
  }

  const wordStyle = previousWord => {
    let wordListClass = "word-list__word";

    switch (true) {
      case matchedWords.includes(previousWord):
        wordListClass = `${wordListClass} ${wordListClass}--matched`;
        break;
      case skippedWords.includes(previousWord):
        wordListClass = `${wordListClass} ${wordListClass}--skipped`;
        break;
      case previousWord === word:
        wordListClass = `${wordListClass} ${wordListClass}--repeated`;
        break;
    }

    return wordListClass;
  };

  const uniquePreviousWords = [...new Set(previousWords)];

  const words = uniquePreviousWords
    .map(previousWord => {
      return (
        <li
          key={previousWord}
          onClick={() => handleWordRepeat(previousWord)}
          className={wordStyle(previousWord)}
        >
          {previousWord}
        </li>
      );
    })
    .reverse();

  return (
    <div className="word-list d-none d-lg-block">
      <h2 className="mb-4">Previous Words ({previousWords.length} total)</h2>
      <ul className="word-list__list">{words}</ul>
    </div>
  );
}

export default WordList;
