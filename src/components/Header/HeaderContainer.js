import React from 'react';

import { useHistory } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import FlashService from '../../services/FlashService';
import { Header } from './Header';

function HeaderContainer({ handlePageChange, isLight, pageColor }) {
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logout()
      .then(() => {
        FlashService.set('message', 'You have successfully logged out.');
        history.push('/login');
      })
  }

  return (
    <Header
      handleLogout={handleLogout}
      handlePageChange={handlePageChange}
      isLight={isLight}
      pageColor={pageColor}
    />
  )
}

export { HeaderContainer };
