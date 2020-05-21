import React from 'react';

function WordList({ handleWordRepeat, previousWords, skippedWords }) {
  if (previousWords.length === 0) {
    return null;
  }

  const words = previousWords.map(word => {
    const wordRepeatCount = previousWords.filter(repeatedWord => {
      return repeatedWord === word;
    }).length

    return (
      <li
        key={word}
        onClick={() => handleWordRepeat(word)}
        className={
          skippedWords.includes(word) ? "word-list__skipped" : "word-list__word"
        }
      >
        {wordRepeatCount > 1 ? `${word} x ${wordRepeatCount}` : word}
      </li>
    );
  });

  return (
    <div>
      <h2>Previous Words</h2>
      <ul>
        {words}
      </ul>
    </div>
  )
}

export default WordList;
