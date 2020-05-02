export function currentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function userSignedIn() {
  return currentUser() !== null
}

