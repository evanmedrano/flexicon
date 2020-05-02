import Cookies from 'js-cookie';

export default function authHeader() {
  const token = JSON.parse(Cookies.get('token'));
  const user = JSON.parse(Cookies.get('user'));

  if (user && token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
