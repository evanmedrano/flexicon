import React, { useState, useEffect } from 'react';

import rails from '../../apis/rails';
import {
  InstrumentalDetail,
  InstrumentalItem,
  InstrumentalList,
  InstrumentalSearch
} from './';

function InstrumentalContainer() {
  const [error, setError] = useState(null);
  const [instrumental, setInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [nextInstrumental, setNextInstrumental] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [searchError, setSearchError] = useState(null);

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
      .then(response => {
        if (response.data.data) {
          setInstrumental(response.data.data[0])
        } else {
          setSearchError(response.data.error)
        }
      })

    setNextInstrumental(instrumentals[0]);
  };

  const handleInstrumentalSelect = instrumental => {
    setInstrumental(instrumental);
    setPlaying(true);
    handleNextInstrumental(instrumentals.indexOf(instrumental))
  };

  const handleNextInstrumental = (index) => {
    setNextInstrumental(instrumentals[index + 1])
  }

  const handleInstrumentalEnding = (currentInstrumental) => {
    const currentInstrumentalIndex = instrumentals.indexOf(currentInstrumental);
    setInstrumental(instrumentals[currentInstrumentalIndex + 1])
    setNextInstrumental(instrumentals[currentInstrumentalIndex + 2])
  }

  const handleInstrumentalPause = () => {
    setPlaying(false);
  }

  return (
    <div>
      <InstrumentalSearch
        searchError={searchError}
        handleFormSubmit={handleFormSubmit}
      />
      <InstrumentalDetail
        instrumental={instrumental}
        nextInstrumental={nextInstrumental}
        handleInstrumentalEnding={handleInstrumentalEnding}
        playing={playing}
      />
      <InstrumentalList
        error={error}
        instrumentals={instrumentals}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalPause={handleInstrumentalPause}
      />
    </div>
  )
}

export { InstrumentalContainer };
