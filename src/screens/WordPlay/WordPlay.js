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
  const [nextInstrumental, setNextInstrumental] = useState(null);
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

    setNextInstrumental(instrumentals[0]);
  };

  const handleInstrumentalSelect = instrumental => {
    setInstrumental(instrumental);
    handleNextInstrumental(instrumentals.indexOf(instrumental))
  };

  const handleNextInstrumental = (index) => {
    setNextInstrumental(instrumentals[index + 1])
  }

  const handleAudioEnding = (currentInstrumental) => {
    const currentInstrumentalIndex = instrumentals.indexOf(currentInstrumental);
    setInstrumental(instrumentals[currentInstrumentalIndex + 1])
    setNextInstrumental(instrumentals[currentInstrumentalIndex + 2])
  }

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  const startRecording = () => {
    setRecord(true);
  }

  const stopRecording = () => {
    setRecord(false);
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
            <InstrumentalDetail
              instrumental={instrumental}
              nextInstrumental={nextInstrumental}
              handleAudioEnding={handleAudioEnding}
            />
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
