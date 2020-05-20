import React, { useState, useRef, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';

import { getWord } from '../../api/words';
import * as Word from './';

function WordContainer() {
  const [error, setError] = useState(null);
  const [previousWords, setPreviousWords] = useState([]);
  const [word, setWord] = useState(null);

  const intervalId = useRef();

  useEffect(() => {
    if (!word) {
      handleWordRequest();
    }

    // intervalId.current = setInterval(() => handleWordRequest(), 10000);
    return () => clearInterval(intervalId.current);
  }, [word])

  const handleWordRequest = () => {
    getWord(
      response => {
        if (word) {
          setPreviousWords([...previousWords, word]);
        }

        setWord(response.data.word);
      }, error => {
        setError(error);
      }
    )
  };

  const handleWordRepeat = selectedWord => {
    setWord(selectedWord);
  }

  const handleWordSkip = () => {
    handleWordRequest();
  }

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  return (
    <Col xs="6">
      <Word.Detail
        error={error}
        handleWordSkip={handleWordSkip}
        startWordLoop={startWordLoop}
        stopWordLoop={stopWordLoop}
        word={word}
      />
      <Word.List
        handleWordRepeat={handleWordRepeat}
        previousWords={previousWords}
      />
    </Col>
  )
}

export { WordContainer };
