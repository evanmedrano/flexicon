import React, { useState, useEffect } from 'react';

import rails from '../../apis/rails';
import {
  InstrumentalDetail,
  InstrumentalFilter,
  InstrumentalList,
  InstrumentalSearch,
  InstrumentalQueue
} from './';

function InstrumentalContainer() {
  const [activeInstrumental, setActiveInstrumental] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [instrumental, setInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [nextInstrumental, setNextInstrumental] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [queue, setQueue] = useState([]);

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
    setActiveInstrumental(instrumental);

    if (queue.includes(instrumental)) {
      if (queue.length === 1) {
        setNextInstrumental(instrumentals[0])
      } else {
        setQueue(queue.filter(queueItem => {
          return queue.indexOf(queueItem) > queue.indexOf(instrumental);
        }));
        handleNextInstrumental(queue, queue.indexOf(instrumental))
      }
    } else {
      handleNextInstrumental(instrumentals, instrumentals.indexOf(instrumental))
    }
    setPlaying(true);
  };

  const handleNextInstrumental = (list, index) => {
    if (list.length - 1 === index) {
      setNextInstrumental(instrumentals[0])
    } else {
      setNextInstrumental(list[index + 1])
    }
  }

  const handleInstrumentalEnding = (currentInstrumental) => {
    let currentInstrumentalIndex;
    let instrumentalsList;
    const nextInQueue = queue[0];
    if (queue.length !== 0) {
      if (queue.length === 1 && nextInstrumental === instrumentals[0]) {
        setInstrumental(instrumentals[0])
        setActiveInstrumental(instrumentals[0])
        setNextInstrumental(instrumentals[1])
      } else if (queue.length === 1) {
        setInstrumental(nextInQueue);
        setActiveInstrumental(nextInQueue)
        setNextInstrumental(instrumentals[0]);
      } else {
        setInstrumental(nextInQueue);
        setActiveInstrumental(nextInQueue)
        setNextInstrumental(queue[1])
      }
      setQueue(queue.filter(queueItem => {
        return nextInQueue !== queueItem;
      }));
    } else if (nextInstrumental === instrumentals[0]) {
      setInstrumental(instrumentals[0])
      setActiveInstrumental(instrumentals[0])
      setNextInstrumental(instrumentals[1])
    } else {
      currentInstrumentalIndex = instrumentals.indexOf(currentInstrumental);
      instrumentalsList = instrumentals
      setInstrumental(instrumentalsList[currentInstrumentalIndex + 1])
      setActiveInstrumental(instrumentalsList[currentInstrumentalIndex + 1])
      setNextInstrumental(instrumentalsList[currentInstrumentalIndex + 2])
    }
  }

  const handleInstrumentalPause = () => {
    setPlaying(false);
  }

  const handleInstrumentalFilter = filter => {
    setFilter(filter);
  }

  const handleFilterReset = () => {
    setFilter('');
  }

  const handleQueueAdd = instrumental => {
    setQueue([...queue, instrumental]);
    setNextInstrumental(queue[0] || instrumental);
  }

  const handleQueueReset = () => {
    setQueue([]);
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
      <InstrumentalQueue
        activeInstrumental={activeInstrumental}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        handleQueueReset={handleQueueReset}
        filter={filter}
        queue={queue}
      />
      <InstrumentalFilter
        filter={filter}
        handleInstrumentalFilter={handleInstrumentalFilter}
        handleFilterReset={handleFilterReset}
      />
      <InstrumentalList
        activeInstrumental={activeInstrumental}
        error={error}
        filter={filter}
        handleFilterReset={handleFilterReset}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleQueueAdd={handleQueueAdd}
        instrumentals={instrumentals}
      />
    </div>
  )
}

export { InstrumentalContainer };
