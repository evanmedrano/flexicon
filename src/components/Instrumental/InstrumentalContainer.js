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
  const [nextInstrumental, setNextInstrumental] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [searchError, setSearchError] = useState(null);
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

    setNextInstrumental(instrumentals[0]);
  };

  const handleInstrumentalPlay = instrumental => {
    setInstrumental(instrumental);
    setActiveInstrumental(instrumental);
    const removedInstrumentals = instrumentals.splice(0, instrumentals.indexOf(instrumental) + 1)
    setInstrumentals(instrumentals.concat(removedInstrumentals))

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
    if (queue.length !== 0) {
      setInstrumental(queue[0])
      setActiveInstrumental(queue[0])
      setQueue(queue.filter(queueItem => {
        return queue[0] !== queueItem;
      }));
    } else {
      instrumentalsList = instrumentals
      setInstrumental(instrumentalsList[0])
      setActiveInstrumental(instrumentalsList[0])
      setNextInstrumental(instrumentalsList[1])
      const removedInstrumentals = instrumentals.splice(0, 1);
      currentInstrumentalIndex = instrumentals.indexOf(currentInstrumental);
      setInstrumentals(instrumentals.concat(removedInstrumentals));
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
    setQueueInstrumentals([...queue, instrumental]);
    setNextInstrumental(queue[0] || instrumental);
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
              handleInstrumentalPlay={handleInstrumentalPlay}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              playing={playing}
              queueInstrumentals={queueInstrumentals}
            />
            <InstrumentalQueue
              activeInstrumental={activeInstrumental}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalPlay={handleInstrumentalPlay}
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
              handleInstrumentalPlay={handleInstrumentalPlay}
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
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        instrumental={instrumental}
        playing={playing}
      />
    </>
  )
}

export { InstrumentalContainer };
