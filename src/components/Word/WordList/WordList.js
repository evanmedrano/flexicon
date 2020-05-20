import React from 'react';

function WordList({ handleWordRepeat, previousWords }) {
  if (previousWords.length === 0) {
    return null;
  }

  const words = previousWords.map(word => {
    return (
      <li key={word} onClick={() => handleWordRepeat(word)}>{word}</li>
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
