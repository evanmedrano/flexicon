import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import { currentUser, userSignedIn, redirectToLoginScreen } from '../../utilities';
import {
  deleteInstrumentalLike,
  postInstrumental,
  postInstrumentalLike
} from '../../api/instrumentals';

import * as Instrumental from "./";

function InstrumentalContainer() {
  const [currentInstrumental, setCurrentInstrumental] = useState(null);
  const [filter, setFilter] = useState("");
  const [instrumentals, setInstrumentals] = useState([]);
  const [instrumentalsList, setInstrumentalsList] = useState([]);
  const [likedInstrumentals, setLikedInstrumentals] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [previousInstrumentals, setPreviousInstrumentals] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const [queue, setQueue] = useState([]);


  const history = useHistory();
  const user = currentUser();

  const handleInstrumentalsRequest = response => {
    setInstrumentals(response);
    setInstrumentalsList(response);
  };

  const handleLikedInstrumentalsRequest = response => {
    const likedInstrumentalCreatedTimes = response.map(res => res.created_at);
    const instrumentalsLiked = response.map(res => res.instrumental);

    const updatedInstrumentalCreatedTimes = instrumentalsLiked.map(inst => {
      const indexOfInstrumental = instrumentalsLiked.indexOf(inst);
      const instrumentalLikedTime = likedInstrumentalCreatedTimes[indexOfInstrumental];

      return Object.assign({}, inst, { created_at: instrumentalLikedTime })
    })

    setLikedInstrumentals(updatedInstrumentalCreatedTimes);
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

  const handleInstrumentalLike = instrumental => {
    if (!userSignedIn()) {
      redirectToLoginScreen();
      history.push("/login");
    } else {
      const likedInstrumental = getLikedInstrumental(instrumental);

      postInstrumentalLike(likedInstrumental, user, response => {
        setLikedInstrumentals([...likedInstrumentals, instrumental]);
      }, error => {
        console.log(error);
      })
    }
  }

  const getLikedInstrumental = instrumental => {
    if (instrumentals.includes(instrumental)) {
      return instrumental;
    } else {
      postInstrumental(instrumental, response => {
        setInstrumentals([...instrumentals, response.data.params])
      }, error => {
        console.log(error);
        return;
      })
      return instrumentals[instrumentals.length - 1];
    }
  }

  const handleInstrumentalDislike = instrumental => {
    deleteInstrumentalLike(instrumental, response => {
      setLikedInstrumentals(likedInstrumentals.filter(likedInstrumental => {
        return likedInstrumental !== instrumental;
      }));
    }, error => {
      console.log(error);
    })
  }

  const isInstrumentalLiked = () => {
    return likedInstrumentals.filter(likedInstrumental => {
      return likedInstrumental.title === currentInstrumental.title;
    }).length === 1
  }

  const showLikedInstrumentals = () => {
    if (!userSignedIn()) {
      redirectToLoginScreen();
      history.push("/login");
    } else {
      setInstrumentalsList(likedInstrumentals);
    }
  }

  const showAllInstrumentals = () => {
    setInstrumentalsList(instrumentals);
  }

  return (
    <>
      <Col xs="6">
        <Instrumental.Search
          handleInstrumentalSelect={handleInstrumentalSelect}
        />
        <Instrumental.Detail
          currentInstrumental={currentInstrumental}
          handleInstrumentalEnding={handleInstrumentalEnding}
          handleInstrumentalDislike={handleInstrumentalDislike}
          handleInstrumentalLike={handleInstrumentalLike}
          handleInstrumentalPause={handleInstrumentalPause}
          handleInstrumentalSelect={handleInstrumentalSelect}
          handleQueueAdd={handleQueueAdd}
          handleQueueRemove={handleQueueRemove}
          isInstrumentalLiked={isInstrumentalLiked}
          playing={playing}
          queue={queue}
        />
        <Instrumental.Queue
          handleInstrumentalDislike={handleInstrumentalDislike}
          handleInstrumentalLike={handleInstrumentalLike}
          handleInstrumentalPause={handleInstrumentalPause}
          handleInstrumentalSelect={handleInstrumentalSelect}
          handleQueueAdd={handleQueueAdd}
          handleQueueRemove={handleQueueRemove}
          handleQueueReset={handleQueueReset}
          likedInstrumentals={likedInstrumentals}
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
          handleInstrumentalDislike={handleInstrumentalDislike}
          handleInstrumentalLike={handleInstrumentalLike}
          handleInstrumentalPause={handleInstrumentalPause}
          handleInstrumentalsRequest={handleInstrumentalsRequest}
          handleInstrumentalSelect={handleInstrumentalSelect}
          handleLikedInstrumentalsRequest={handleLikedInstrumentalsRequest}
          handleQueueAdd={handleQueueAdd}
          handleQueueRemove={handleQueueRemove}
          instrumentals={instrumentals}
          instrumentalsList={instrumentalsList}
          likedInstrumentals={likedInstrumentals}
          playing={playing}
          showAllInstrumentals={showAllInstrumentals}
          showLikedInstrumentals={showLikedInstrumentals}
          queue={queue}
        />
      </Col>
      <Instrumental.PlayerContainer
        currentInstrumental={currentInstrumental}
        handleInstrumentalEnding={handleInstrumentalEnding}
        handleInstrumentalDislike={handleInstrumentalDislike}
        handleInstrumentalLike={handleInstrumentalLike}
        handleInstrumentalPause={handleInstrumentalPause}
        handleInstrumentalPlay={handleInstrumentalPlay}
        handleInstrumentalSelect={handleInstrumentalSelect}
        handleInstrumentalShuffle={handleInstrumentalShuffle}
        handleNextInstrumental={handleNextInstrumental}
        handlePreviousInstrumental={handlePreviousInstrumental}
        isInstrumentalLiked={isInstrumentalLiked}
        playing={playing}
        shuffling={shuffling}
      />
    </>
  );
}

export { InstrumentalContainer };
