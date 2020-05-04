import React, { useState, useEffect } from 'react';

import rails from '../../apis/rails';
import { InstrumentalDetail } from './InstrumentalDetail';
import { InstrumentalList } from './InstrumentalList';
import { InstrumentalSearch } from './InstrumentalSearch';

function InstrumentalContainer() {
  const [error, setError] = useState(null);
  const [instrumental, setInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [nextInstrumental, setNextInstrumental] = useState(null);

  useEffect(() => {
    handleInstrumentalsRequest();
  }, [])

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

  return (
    <div>
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
    </div>
  )
}

export { InstrumentalContainer };
