import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

const base_uri = 'http://localhost:3030/api/v1'

function WordPlay() {
  const [instrumental, setInstrumental] = useState(null);
  const [query, setQuery] = useState('');
  const [word, setWord] = useState(null);

  const intervalId = useRef();

  function handleFormSubmit(event) {
    event.preventDefault()

    handleInstrumentalRequest(query)
  }

  async function handleInstrumentalRequest(query) {
    console.log(query)

    const response = await axios({
      baseURL: base_uri,
      method: 'get',
      url: '/instrumentals',
      params: {
        q: query
      }
    })
    setInstrumental(response.data.data[0].preview);
  };

  async function handleWordRequest() {
    const response = await axios({
      baseURL: base_uri,
      method: 'get',
      url: '/words'
    })
    setWord(response.data.word);
  };

  function handleInputChange(event) {
    setQuery(event.target.value)
  }

  useEffect(() => {
    handleWordRequest()
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
    return () => clearInterval(intervalId.current);
  }, []);

  const startWordLoop = () => {
    intervalId.current = setInterval(() => handleWordRequest(), 10000);
  };

  const stopWordLoop = () => clearInterval(intervalId.current);

  return (
    <div className="word-play">
      <Container>
        <Row>
          <Col xs="6">
            <h1 className="text-center">
              {word === null ? 'Finding your new word' : word}
            </h1>
            <button onClick={stopWordLoop}>Stop</button>
            <button onClick={startWordLoop}>Start</button>
          </Col>
          <Col xs="6">
            <form onSubmit={handleFormSubmit}>
              <input type="text" onChange={handleInputChange} value={query} />
              <button>Search</button>
            </form>
            <video loop controls autoPlay key={instrumental}>
              <source src={instrumental} type="audio/mpeg" />
            </video>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { WordPlay };
