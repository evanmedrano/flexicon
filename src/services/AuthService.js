import Cookies from 'js-cookie';

import rails from '../api/rails';

class AuthService {
  register(email, password, password_confirmation) {
    return rails.post('/signup', {
      user: {
        email,
        password,
        password_confirmation
      }
    });
  }

  login(email, password) {
    return rails
      .post('/login', {
        user: {
          email,
          password
        }
      })
      .then(response => {
        if (response.headers.authorization) {
          Cookies.set('token', JSON.stringify(response.headers.authorization), {
            expires: 1
          })
          Cookies.set('user', JSON.stringify(response.data), { expires: 1 });
        }

        return response.data;
      });
  }

  logout() {
    Cookies.remove('token');
    Cookies.remove('user');
    return rails.delete('/logout');
  }
}

export default new AuthService();
