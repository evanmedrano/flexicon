import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({ bitRate: 128 })

function Mic() {
  const [recording, setRecording] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [blocked, setBlocked] = useState(false)


  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('permission granted')
        setBlocked(false)
      },
      () => {
        console.log('permission denied')
        setBlocked(true)
      },
    )
  }, [])

  const startRecording = () => {
    if (blocked) {
      console.log('permission denied')
    } else {
      recorder
        .start()
        .then(() => { setRecording(true) })
        .catch(error => console.log(error))
    }
  }

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'my-recording.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        const audio = new Audio(URL.createObjectURL(file));

        setRecording(false);
        setBlobURL(audio.src);
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Record
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop
      </button>

      <audio src={blobURL} controls="controls" />
    </div>
  )
}

export { Mic };
