import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  InstrumentalDetail,
  InstrumentalList,
  InstrumentalSearch,
  Mic
} from '../../components';
import { Word } from '../../components';
import rails from '../../apis/rails';

function WordPlay() {
  const [error, setError] = useState(null);
  const [instrumental, setInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [record, setRecord] = useState(false)
  const [word, setWord] = useState(null);

  const intervalId = useRef();

  useEffect(() => {
    handleInstrumentalsRequest();
    handleWordRequest();
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
    return () => clearInterval(intervalId.current);
  }, []);

  const handleWordRequest = () => {
    rails
      .get('/words')
      .then(response => setWord(response.data.word))
      .catch(error => setError(error));
  };

  const handleInstrumentalsRequest = () => {
    rails
      .get('/instrumentals')
      .then(response => setInstrumentals(response.data))
      .catch(error => setError(error));
  };

  const handleFormSubmit = search => {
    rails
      .get(`instrumentals/${search}`)
      .then(response => setInstrumental(response.data.data[0]))
      .catch(error => setError(error));
  };

  const handleInstrumentalSelect = instrumental => {
    setInstrumental(instrumental);
  };

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  const startRecording = () => {
    setRecord(true);
    console.log(record)
  }

  const stopRecording = () => {
    setRecord(false);
    console.log(record)
  }

  return (
    <div className="word-play">
      <Container>
        <Row>
          <Col xs="6">
            <Word
              error={error}
              startWordLoop={startWordLoop}
              stopWordLoop={stopWordLoop}
              word={word}
            />
            <br/><br/>
            <Mic />
          </Col>
          <Col xs="6">
            <InstrumentalSearch handleFormSubmit={handleFormSubmit} />
            <InstrumentalDetail instrumental={instrumental} />
            <InstrumentalList
              error={error}
              instrumentals={instrumentals}
              handleInstrumentalSelect={handleInstrumentalSelect}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { WordPlay };
