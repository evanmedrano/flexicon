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
          <WordContainer />
          <br/><br/>
          {/*<MicContainer />*/}
          <InstrumentalContainer />
        </Row>
      </Container>
    </div>
  );
}

export { WordPlay };
