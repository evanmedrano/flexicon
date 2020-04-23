import React from 'react';
import '../styles/index.scss';
import Routes from '../routes';
import { Header } from '../components';

function App() {
  return (
    <Routes
      header={<Header />}
    />
  );
}

export default App;
