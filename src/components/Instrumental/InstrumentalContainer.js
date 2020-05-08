import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';

import rails from '../../apis/rails';
import {
  InstrumentalDetail,
  InstrumentalFilter,
  InstrumentalList,
  InstrumentalPlayer,
  InstrumentalSearch,
  InstrumentalQueue
} from './';

function InstrumentalContainer() {
  const [activeInstrumental, setActiveInstrumental] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [instrumental, setInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [looping, setLooping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [previousInstrumentals, setPreviousInstrumentals] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [shuffling, setShuffling] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueInstrumentals, setQueueInstrumentals] = useState([]);

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
  };

  const handleInstrumentalSelect = selectedInstrumental => {
    if (instrumental) {
      setPreviousInstrumentals([...previousInstrumentals, instrumental]);
    }
    setInstrumental(selectedInstrumental);
    setActiveInstrumental(selectedInstrumental);
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

  const handleInstrumentalEnding = (currentInstrumental) => {
    let currentInstrumentalIndex;
    let instrumentalsList;
    if (shuffling) {
      setInstrumental(instrumentals[Math.floor(Math.random() * instrumentals.length)])
    }

    if (queue.length !== 0) {
      setInstrumental(queue[0])
      setActiveInstrumental(queue[0])
      setPreviousInstrumentals([...previousInstrumentals, queue[0]]);
      setQueue(queue.filter(queueItem => {
        return queue[0] !== queueItem;
      }));
    } else {
      instrumentalsList = instrumentals
      setInstrumental(instrumentalsList[0])
      setActiveInstrumental(instrumentalsList[0])
      setPreviousInstrumentals([...previousInstrumentals, currentInstrumental]);
      const removedInstrumentals = instrumentals.splice(0, 1);
      currentInstrumentalIndex = instrumentals.indexOf(currentInstrumental);
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
    setQueueInstrumentals([...queue, instrumental]);
  }

  const handleQueueRemove = instrumental => {
    setQueue(queue.filter(queueItem => {
      return queueItem !== instrumental;
    }));
  }

  const handleQueueReset = instrumental => {
    setQueue([]);
    setQueueInstrumentals([])
  }

  const handleNextInstrumental = () => {
    setPreviousInstrumentals([...previousInstrumentals, instrumental]);

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

  const handleInstrumentalLoop = () => {
    setLooping(!looping);
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
              activeInstrumental={activeInstrumental}
              instrumental={instrumental}
              handleInstrumentalEnding={handleInstrumentalEnding}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              playing={playing}
              queueInstrumentals={queueInstrumentals}
            />
            <InstrumentalQueue
              activeInstrumental={activeInstrumental}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              handleQueueReset={handleQueueReset}
              filter={filter}
              playing={playing}
              queue={queue}
              queueInstrumentals={queueInstrumentals}
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
              handleQueueRemove={handleQueueRemove}
              heading="Up Next"
              instrumentals={instrumentals}
              playing={playing}
              queueInstrumentals={queueInstrumentals}
            />
          </Col>
        </Row>
      </Container>
      <InstrumentalPlayer
        handleInstrumentalEnding={handleInstrumentalEnding}
        handleInstrumentalLoop={handleInstrumentalLoop}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalShuffle={handleInstrumentalShuffle}
        handleNextInstrumental={handleNextInstrumental}
        handlePreviousInstrumental={handlePreviousInstrumental}
        instrumental={instrumental}
        looping={looping}
        playing={playing}
        shuffling={shuffling}
      />
    </>
  )
}

export { InstrumentalContainer };
