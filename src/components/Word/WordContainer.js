import React, { useState, useRef, useEffect } from 'react';

import { WordDetail } from './WordDetail';
import rails from '../../apis/rails';

function WordContainer() {
  const [word, setWord] = useState(null);
  const [error, setError] = useState(null);

  const intervalId = useRef();

  useEffect(() => {
    handleWordRequest();
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
    return () => clearInterval(intervalId.current);
  }, [])

  const handleWordRequest = () => {
    rails
      .get('/words')
      .then(response => setWord(response.data.word))
      .catch(error => setError(error));
  };

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  return (
    <WordDetail
      error={error}
      word={word}
      startWordLoop={startWordLoop}
      stopWordLoop={stopWordLoop}
    />
  )
}

export { WordContainer };
