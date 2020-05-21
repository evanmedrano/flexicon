import React, { useState, useRef, useEffect } from 'react';

import { Col } from 'reactstrap';

import { getWord } from '../../api/words';
import * as Word from './';

function WordContainer() {
  const [error, setError] = useState(null);
  const [previousWords, setPreviousWords] = useState([]);
  const [skippedWords, setSkippedWords] = useState([]);
  const [word, setWord] = useState(null);
  const [wordMatch, setWordMatch] = useState(false);

  const intervalId = useRef();

  useEffect(() => {
    if (!word) {
      handleWordRequest();
    }

    intervalId.current = setInterval(() => handleWordRequest(), 10000);
    return () => clearInterval(intervalId.current);
  }, [word])

  const handleWordRequest = () => {
    getWord(
      response => {
        if (word) {
          setPreviousWords([...previousWords, word]);
        }
        setWord(response.data.word);
        setWordMatch(false);
      }, error => {
        setError(error);
      }
    )
  };

  const handleWordRepeat = selectedWord => {
    setSkippedWords(skippedWords.filter(skippedWord => {
      return skippedWord !== selectedWord;
    }));

    setWord(selectedWord);
  }

  const handleWordSkip = () => {
    setSkippedWords([...skippedWords, word]);
    handleWordRequest();
  }

  const handleWordMatch = () => {
    setWordMatch(true);
  }

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  return (
    <Col xs="6">
      <Word.Recognition
        handleWordMatch={handleWordMatch}
        word={word}
      />
      <Word.Detail
        error={error}
        handleWordSkip={handleWordSkip}
        startWordLoop={startWordLoop}
        stopWordLoop={stopWordLoop}
        word={word}
        wordMatch={wordMatch}
      />
      <Word.List
        handleWordRepeat={handleWordRepeat}
        previousWords={previousWords}
        skippedWords={skippedWords}
      />
    </Col>
  )
}

export { WordContainer };
