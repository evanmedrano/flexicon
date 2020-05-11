import React, { useState } from 'react';

import Routes from '../routes';
import FontAwesome from '../components/FontAwesome';

import '../styles/index.scss';
import { Header, Footer } from '../components';

function App() {
  const [isLight, setIsLight] = useState(true);
  const [pageColor, setPageColor] = useState('light');

  const handlePageChange = (change) => {
    if (change === '🌒') {
      setPageColor('dark')
      setIsLight(false)
    } else {
      setPageColor('light');
      setIsLight(true)
    }
  }

  const bgColor = pageColor === 'light' ? 'hsl(210,17%,98%)' : 'hsl(210,10%,23%)'
  const textColor = pageColor === 'light' ? 'hsl(180,0%,43%)' : 'hsl(0,0%,100%)'

  return (
    <div
      style={{backgroundColor: bgColor, color: textColor}}
      className="d-flex flex-column min-vh-100"
    >
      <div className="mb-auto">
        <Routes
          header={
            <Header
              handlePageChange={handlePageChange}
              isLight={isLight}
              pageColor={pageColor}
            />
          }
        />
      </div>
      <Footer style={{backgroundColor: bgColor, color: textColor}} />
    </div>
  );
}

export default App;
