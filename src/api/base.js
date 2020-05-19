import rails from "./rails";
import authHeader from "../services/auth-header";
import { currentUser } from "../utilities";

const user = currentUser();
const headers = user ? authHeader() : null;

export function getData(url, callback, errorCallback) {
  rails({
    method: "get",
    url: url,
    headers: headers
  })
    .then(response => {
      if (callback) {
        callback(response);
      }
    })
    .catch(error => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}

export function postData(url, params, callback, errorCallback) {
  rails({
    method: "post",
    url: url,
    data: params,
    headers: headers
  })
    .then(response => {
      if (callback) {
        callback(response);
      }
    })
    .catch(error => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}

export function deleteData(url, callback, errorCallback) {
  rails({
    method: "delete",
    url: url,
    headers: headers
  })
    .then(response => {
      if (callback) {
        callback(response);
      }
    })
    .catch(error => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}
