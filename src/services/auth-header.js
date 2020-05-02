export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
