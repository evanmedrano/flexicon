import { getData, postData } from './base';

export function getInstrumentals(callback, errorCallback) {
  getData('/instrumentals', callback, errorCallback);
}

export function getLikedInstrumentals(callback, errorCallback) {
  getData('/instrumental_likes', callback, errorCallback);
}

export function getInstrumentalSearch(search, callback, errorCallback) {
  getData(`/instrumentals/${search}`, callback, errorCallback);
}

export function postInstrumentalLike(instrumental, user, callback, errorCallback) {
  const params = { instrumental_like: { instrumental_id: instrumental.id, user_id: user.id } }
  postData('/instrumental_likes', params, callback, errorCallback);
}
