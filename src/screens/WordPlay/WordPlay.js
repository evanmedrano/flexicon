import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  InstrumentalContainer,
  MicContainer,
  WordContainer
} from '../../components';

function WordPlay() {
  return (
    <div className="word-play">
      <Container>
        <Row>
          <Col xs="6">
            <WordContainer />
            <br/><br/>
            <MicContainer />
          </Col>
          <Col xs="6">
            <InstrumentalContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { WordPlay };
