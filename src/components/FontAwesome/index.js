import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarAlt,
  faHeart as unlikedBeat
} from '@fortawesome/free-regular-svg-icons';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faHeart as likedBeat,
  faEllipsisH,
  faMusic,
  faPlayCircle,
  faPauseCircle,
  faRandom,
  faRetweet,
  faSearch,
  faTimes,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';

export default library.add(
  faCalendarAlt,
  faChevronCircleLeft,
  faChevronCircleRight,
  faEllipsisH,
  faMusic,
  faPlayCircle,
  faPauseCircle,
  faSearch,
  faTimes,
  faRandom,
  faRetweet,
  faVolumeMute,
  faVolumeUp,
  likedBeat,
  unlikedBeat
);
