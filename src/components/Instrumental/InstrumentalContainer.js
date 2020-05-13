import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';

import rails from '../../apis/rails';
import {
  InstrumentalDetail,
  InstrumentalFilter,
  InstrumentalList,
  InstrumentalPlayerContainer,
  InstrumentalSearch,
  InstrumentalQueue
} from './';

function InstrumentalContainer() {
  const [activeInstrumental, setActiveInstrumental] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentInstrumental, setCurrentInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [previousInstrumentals, setPreviousInstrumentals] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [shuffling, setShuffling] = useState(false);
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
          setCurrentInstrumental(response.data.data[0])
          setSearchError(null)
        } else {
          setSearchError(response.data.error)
        }
      })
  };

  const handleInstrumentalSelect = selectedInstrumental => {
    if (currentInstrumental) {
      setPreviousInstrumentals([...previousInstrumentals, currentInstrumental]);
    }
    setCurrentInstrumental(selectedInstrumental);
    setPlaying(true);

    if (shuffling) {
      return
    }

    if (queue.includes(selectedInstrumental)) {
      setQueue(queue.filter(queueItem => {
        return queue.indexOf(queueItem) > queue.indexOf(selectedInstrumental);
      }))
    } else {
      const removedInstrumentals = instrumentals.splice(0, instrumentals.indexOf(selectedInstrumental) + 1)
      setInstrumentals(instrumentals.concat(removedInstrumentals))
    }
  };

  const handleInstrumentalEnding = (instrumental) => {
    let currentInstrumentalIndex;
    let instrumentalsList;
    if (shuffling) {
      setCurrentInstrumental(instrumentals[Math.floor(Math.random() * instrumentals.length)])
    }

    if (queue.length !== 0) {
      setCurrentInstrumental(queue[0])
      setPreviousInstrumentals([...previousInstrumentals, queue[0]]);
      setQueue(queue.filter(queueItem => {
        return queue[0] !== queueItem;
      }));
    } else {
      instrumentalsList = instrumentals
      setCurrentInstrumental(instrumentalsList[0])
      setPreviousInstrumentals([...previousInstrumentals, instrumental]);
      const removedInstrumentals = instrumentals.splice(0, 1);
      currentInstrumentalIndex = instrumentals.indexOf(instrumental);
      setInstrumentals(instrumentals.concat(removedInstrumentals));
    }
  }

  const handleInstrumentalPause = () => {
    setPlaying(false);
  }

  const handleInstrumentalPlay = () => {
    setPlaying(true);
  }

  const handleInstrumentalFilter = filter => {
    setFilter(filter);
  }

  const handleFilterReset = () => {
    setFilter('');
  }

  const handleQueueAdd = instrumental => {
    setQueue([...queue, instrumental]);
  }

  const handleQueueRemove = instrumental => {
    setQueue(queue.filter(queueItem => {
      return queueItem !== instrumental;
    }));
  }

  const handleQueueReset = () => {
    setQueue([]);
  }

  const handleNextInstrumental = () => {
    setPreviousInstrumentals([...previousInstrumentals, currentInstrumental]);

    if (shuffling) {
      const randomIndex = Math.floor(Math.random() * instrumentals.length)
      const chosen = handleInstrumentalSelect(instrumentals[randomIndex])
      return
    }

    if (queue.length !== 0) {
      handleInstrumentalSelect(queue[0])
    } else {
      handleInstrumentalSelect(instrumentals[0])
    }
  }

  const handlePreviousInstrumental = () => {
    const lastPlayed = previousInstrumentals[previousInstrumentals.length - 1];
    handleInstrumentalSelect(lastPlayed)
    setPreviousInstrumentals(previousInstrumentals.filter(instrumental => {
      return instrumental !== lastPlayed
    }))
  }

  const handleInstrumentalShuffle = () => {
    setShuffling(!shuffling);
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={{ size: 6, offset: 6 }}>
            <InstrumentalSearch
              searchError={searchError}
              handleFormSubmit={handleFormSubmit}
            />
            <InstrumentalDetail
              currentInstrumental={currentInstrumental}
              handleInstrumentalEnding={handleInstrumentalEnding}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              playing={playing}
              queue={queue}
            />
            <InstrumentalQueue
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              handleQueueReset={handleQueueReset}
              playing={playing}
              queue={queue}
            />
            <InstrumentalFilter
              filter={filter}
              handleInstrumentalFilter={handleInstrumentalFilter}
              handleFilterReset={handleFilterReset}
            />
            <InstrumentalList
              currentInstrumental={currentInstrumental}
              error={error}
              filter={filter}
              handleFilterReset={handleFilterReset}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              instrumentals={instrumentals}
              playing={playing}
              queue={queue}
            />
          </Col>
        </Row>
      </Container>
      <InstrumentalPlayerContainer
        handleInstrumentalEnding={handleInstrumentalEnding}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalShuffle={handleInstrumentalShuffle}
        handleNextInstrumental={handleNextInstrumental}
        handlePreviousInstrumental={handlePreviousInstrumental}
        currentInstrumental={currentInstrumental}
        playing={playing}
        shuffling={shuffling}
      />
    </>
  )
}

export { InstrumentalContainer };
