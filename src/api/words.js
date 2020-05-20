import { getData } from "./base";

export function getWord(callback, errorCallback) {
  getData("/words", callback, errorCallback);
}
