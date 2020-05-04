import React from 'react';

function MicDetail({ blobURL, recording, startRecording, stopRecording }) {
  return (
    <div>
      <button onClick={() => startRecording()} disabled={recording}>
        Record
      </button>
      <button onClick={() => stopRecording()} disabled={!recording}>
        Stop
      </button>

      <audio src={blobURL} controls="controls" />
    </div>
  )
}

export { MicDetail };
