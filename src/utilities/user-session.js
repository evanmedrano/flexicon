import Cookies from 'js-cookie';

export function currentUser() {
  return Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
}

export function userSignedIn() {
  return currentUser() !== null
}

