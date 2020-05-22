import React, { useEffect } from 'react';

import SpeechRecognition from 'react-speech-recognition';

function WordRecognition(props) {
  const {
    handleWordMatch,
    looping,
    startListening,
    stopListening,
    resetTranscript,
    transcript,
    word,
  } = props;

  useEffect(() => {
    if (looping) {
      startListening();

      if (word) {
        isWordInTranscript();
      }
    } else {
      stopListening();
    }
  }, [looping, transcript, word])

  const isWordInTranscript = () => {
    const strippedWord = word.replace(/[\s-']/g, "").toLowerCase();
    const strippedTranscript = transcript.replace(/[\s-']/g, "").toLowerCase();

    if (strippedTranscript.includes(strippedWord)){
      handleWordMatch();
      resetTranscript();
    }
  }

  return null;
}

export default SpeechRecognition(WordRecognition);
