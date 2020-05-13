import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";

import * as Instrumental from "./";

function InstrumentalContainer() {
  const [filter, setFilter] = useState("");
  const [currentInstrumental, setCurrentInstrumental] = useState(null);
  const [instrumentals, setInstrumentals] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [previousInstrumentals, setPreviousInstrumentals] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const [queue, setQueue] = useState([]);

  const handleInstrumentalsRequest = response => {
    setInstrumentals(response);
  };

  const handleInstrumentalSelect = instrumental => {
    if (currentInstrumental) {
      setPreviousInstrumentals([...previousInstrumentals, currentInstrumental]);
    }

    setCurrentInstrumental(instrumental);
    setPlaying(true);

    if (shuffling) {
      return;
    }

    if (queue.includes(instrumental)) {
      setQueue(
        queue.filter(queueItem => {
          return queue.indexOf(queueItem) > queue.indexOf(instrumental);
        })
      );
    } else {
      const removedInstrumentals = instrumentals.splice(
        0,
        instrumentals.indexOf(instrumental) + 1
      );
      setInstrumentals(instrumentals.concat(removedInstrumentals));
    }
  };

  const handleInstrumentalEnding = instrumental => {
    if (shuffling) {
      const randomIndex = Math.floor(Math.random() * instrumentals.length);
      setCurrentInstrumental(instrumentals[randomIndex]);
    }

    if (queue.length !== 0) {
      setCurrentInstrumental(queue[0]);
      setPreviousInstrumentals([...previousInstrumentals, queue[0]]);
      handleQueueRemove(queue[0]);
    } else {
      setCurrentInstrumental(instrumentals[0]);
      setPreviousInstrumentals([...previousInstrumentals, instrumental]);
      const removedInstrumentals = instrumentals.splice(0, 1);
      setInstrumentals(instrumentals.concat(removedInstrumentals));
    }
  };

  const handleInstrumentalPause = () => {
    setPlaying(false);
  };

  const handleInstrumentalPlay = () => {
    setPlaying(true);
  };

  const handleInstrumentalFilter = filter => {
    setFilter(filter);
  };

  const handleFilterReset = () => {
    setFilter("");
  };

  const handleQueueAdd = instrumental => {
    setQueue([...queue, instrumental]);
  };

  const handleQueueRemove = instrumental => {
    setQueue(
      queue.filter(queueItem => {
        return queueItem !== instrumental;
      })
    );
  };

  const handleQueueReset = () => {
    setQueue([]);
  };

  const handleNextInstrumental = () => {
    setPreviousInstrumentals([...previousInstrumentals, currentInstrumental]);

    if (shuffling) {
      const randomIndex = Math.floor(Math.random() * instrumentals.length);
      return handleInstrumentalSelect(instrumentals[randomIndex]);
    }

    if (queue.length !== 0) {
      handleInstrumentalSelect(queue[0]);
    } else {
      handleInstrumentalSelect(instrumentals[0]);
    }
  };

  const handlePreviousInstrumental = () => {
    const lastPlayed = previousInstrumentals[previousInstrumentals.length - 1];
    handleInstrumentalSelect(lastPlayed);
    setPreviousInstrumentals(
      previousInstrumentals.filter(instrumental => {
        return instrumental !== lastPlayed;
      })
    );
  };

  const handleInstrumentalShuffle = () => {
    setShuffling(!shuffling);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={{ size: 6, offset: 6 }}>
            <Instrumental.Search
              handleInstrumentalSelect={handleInstrumentalSelect}
            />
            <Instrumental.Detail
              currentInstrumental={currentInstrumental}
              handleInstrumentalEnding={handleInstrumentalEnding}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              playing={playing}
              queue={queue}
            />
            <Instrumental.Queue
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalSelect={handleInstrumentalSelect}
              handleQueueAdd={handleQueueAdd}
              handleQueueRemove={handleQueueRemove}
              handleQueueReset={handleQueueReset}
              playing={playing}
              queue={queue}
            />
            <Instrumental.Filter
              filter={filter}
              handleInstrumentalFilter={handleInstrumentalFilter}
              handleFilterReset={handleFilterReset}
            />
            <Instrumental.List
              currentInstrumental={currentInstrumental}
              filter={filter}
              handleFilterReset={handleFilterReset}
              handleInstrumentalPause={handleInstrumentalPause}
              handleInstrumentalsRequest={handleInstrumentalsRequest}
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
      <Instrumental.PlayerContainer
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
  );
}

export { InstrumentalContainer };
