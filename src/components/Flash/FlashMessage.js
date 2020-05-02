import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import FlashService from '../../services/FlashService';

function FlashMessage() {
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    setFlashMessage(FlashService.get('message'))
  }, [])

  return (
    <Container>
      <div className={flashMessage ? "flash" : ""}>
        {flashMessage}
      </div>
    </Container>
  )
}

export { FlashMessage };
