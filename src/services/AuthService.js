import rails from '../apis/rails';

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
          localStorage.setItem(
            'token',
            JSON.stringify(response.headers.authorization)
          );
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return rails.delete('/logout');
  }
}

export default new AuthService();
