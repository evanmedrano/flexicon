import React, { useEffect } from 'react';

import SpeechRecognition from 'react-speech-recognition';

function WordRecognition(props) {
  const {
    browserSupportsSpeechRecognition,
    handleWordMatch,
    resetTranscript,
    startListening,
    stopListening,
    transcript,
    word,
  } = props;

  useEffect(() => {
    if (word) {
      const strippedWord = word.replace(/[\s-']/g, "").toLowerCase();
      const strippedTranscript = transcript.replace(/[\s-']/g, "").toLowerCase();

      if (strippedTranscript.includes(strippedWord)){
        handleWordMatch();
      }
    }
  })

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
    </div>
  );
}

const options = { autoStart: false };

export default SpeechRecognition(options)(WordRecognition);
