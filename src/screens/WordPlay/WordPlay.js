import React from 'react';
import {
  InstrumentalContainer,
  MicContainer,
  WordContainer
} from '../../components';

function WordPlay() {
  return (
    <div className="word-play">
      <div className="container-fluid p-0">
            {/*<WordContainer />
            <br/><br/>
            <MicContainer />
            */}
        <InstrumentalContainer />
      </div>
    </div>
  );
}

export { WordPlay };
