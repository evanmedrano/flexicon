import React, { useState } from 'react';
import '../styles/index.scss';
import Routes from '../routes';
import { Header } from '../components';

function App() {
  const [isLight, setIsLight] = useState(true);
  const [pageColor, setPageColor] = useState('light');

  const handlePageChange = (change) => {
    if (change === 'Night mode') {
      setPageColor('dark')
      setIsLight(false)
    } else {
      setPageColor('light');
      setIsLight(true)
    }
  }

  const backgroundColor = pageColor === 'light' ? 'hsl(210,17%,98%)' : 'hsl(210,10%,23%)'
  const textColor = pageColor === 'light' ? 'hsl(180,0%,43%)' : 'hsl(0,0%,100%)'

  const myStyle = {
    backgroundColor: `${backgroundColor}`,
    color: `${textColor}`,
    height: "100vh"
  }

  return (
    <div style={myStyle}>
      <Routes
        header={
          <Header
            currentPageColor={handlePageChange}
            isLight={isLight}
            pageColor={pageColor}
          />
        }
      />
    </div>
  );
}

export default App;
