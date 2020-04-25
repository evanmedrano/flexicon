import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

const KEY = '';
const endpoint = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';

function WordPlay() {
  const [word, setWord] = useState(null);
  const [loop, setLoop] = useState(0);

  const sendGetRequest = () => {
    return axios({
      baseURL: endpoint,
      method: 'get',
      headers: {
        'X-Mashape-Key': KEY,
        Accept: 'application/json'
      }
    }).then(response => {
      setWord(response.data.word);
    }).catch(error => {
      console.log(error);
    });
  };

  const wordLoop = useEffect(() => {
    sendGetRequest()
    if (loop === 0) {
      return
    }
    // setInterval(() => sendGetRequest(), loop);
  }, [loop]);

  useEffect(() => {
    return () => {
      console.log('clean')
    }
  }, []);

  const stopWordLoop = () => {
    clearInterval(wordLoop)
    setLoop(0)
  }

  const setLoopLength = () => {
    setLoop(1000)
  }

  return (
    <div className="word-play">
      <Container>
        <Row>
          <Col xs="6">
            <h1 className="text-center">
              {word === null ? 'Finding your new word' : word}
            </h1>
            <button onClick={stopWordLoop}>Stop</button>
            <button onClick={setLoopLength}>1000</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { WordPlay };
