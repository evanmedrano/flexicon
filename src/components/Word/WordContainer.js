import React, { useState, useRef, useEffect } from 'react';

import { Col } from 'reactstrap';

import { getWord } from '../../api/words';
import * as Word from './';

function WordContainer() {
  const [error, setError] = useState(null);
  const [looping, setLooping] = useState(true);
  const [matchedWords, setMatchedWords] = useState([]);
  const [previousWords, setPreviousWords] = useState([]);
  const [skippedWords, setSkippedWords] = useState([]);
  const [word, setWord] = useState(null);
  const [wordMatch, setWordMatch] = useState(false);

  const intervalId = useRef();

  useEffect(() => {
    if (!word) {
      handleWordRequest();
    }

    if (looping) {
      intervalId.current = setInterval(() => handleWordRequest(), 5000);
    }

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

    setMatchedWords(matchedWords.filter(matchedWord => {
      return matchedWord !== selectedWord;
    }));

    setWord(selectedWord);
  }

  const handleWordSkip = () => {
    setSkippedWords([...skippedWords, word]);
    handleWordRequest();
  }

  const handleWordMatch = () => {
    setMatchedWords([...matchedWords, word]);
    setWordMatch(true);
  }

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 5000);
    setLooping(true);
  };

  const stopWordLoop = () => {
    setLooping(false);
    return () => clearInterval(intervalId.current);
  }

  return (
    <Col xs="6">
      <div>
        <Word.Recognition
          handleWordMatch={handleWordMatch}
          looping={looping}
          word={word}
        />
        <div className="d-flex flex-column w-100">
          <Word.Detail
            error={error}
            handleWordSkip={handleWordSkip}
            looping={looping}
            startWordLoop={startWordLoop}
            stopWordLoop={stopWordLoop}
            word={word}
            wordMatch={wordMatch}
          />
          <Word.List
            handleWordRepeat={handleWordRepeat}
            matchedWords={matchedWords}
            previousWords={previousWords}
            skippedWords={skippedWords}
            word={word}
          />
        </div>
      </div>
    </Col>
  )
}

export { WordContainer };
