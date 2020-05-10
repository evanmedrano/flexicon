import React, { useEffect } from 'react';

function InstrumentalPlayerSlider(props) {
  const {
    handleAudioDrag,
    handleTimeUpdate,
    handleVolumeUpdate,
    slider,
    sliderControl
  } = props;

  const dragImage = new Image(0,0)
  const baseClass = "instrumental-player-slider"

  useEffect(() => {
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }, [])

  const handleSliderUpdate = event => {
    const result = getClickToSliderRatio(event);
    const sliderCircle = slider.current.querySelector(`.${baseClass}__circle`);

    if (event.target === sliderCircle) {
      return;
    }

    handleSliderState(result);
    handleSliderControlUpdate(result);
  }

  const handleStartOfSliderDrag = event => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const dimensions = getSliderDimensions();
    if (event.clientY > dimensions.bottom || event.clientY < dimensions.top) {
      return;
    }
  }

  const handleSliderDrag = event => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const result = getClickToSliderRatio(event);
    const percentage = result * 100;

    if (percentage > 100) {
      handleSliderState(1);
      return sliderControl === 'volume' ? handleVolumeUpdate(1) : handleAudioDrag(result);
    } else if (percentage < 0) {
      handleSliderState(0);
      return sliderControl === 'volume' ? handleVolumeUpdate(0) : handleAudioDrag(result);
    }

    handleSliderState(result);
    return sliderControl === 'volume' ? handleVolumeUpdate(result) : handleAudioDrag(result);
  }

  const handleEndOfSliderDrag = event => {
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    const result = getClickToSliderRatio(event);
    const percentage = result * 100;

    if (percentage > 100) {
      handleSliderState(1);
      handleSliderControlUpdate(1)
      return;
    } else if (percentage < 0) {
      handleSliderState(0);
      handleSliderControlUpdate(0)
      return;
    }

    handleSliderState(result);
    handleSliderControlUpdate(result);
  }

  const getClickToSliderRatio = event => {
    const clickLocation = Math.floor(event.clientX)
    const dimensions = getSliderDimensions();
    const clickDistance = Math.floor(clickLocation - dimensions.left);

    return clickDistance / dimensions.width;
  }

  const getSliderDimensions = () => {
    const sliderElement = slider.current.closest('.instrumental-player-slider');
    return sliderElement.getBoundingClientRect();
  }

  const handleSliderState = state => {
    slider.current.style.width = state * 100 + '%';
  }

  const handleSliderControlUpdate = result => {
    if (sliderControl === 'volume') {
      return handleVolumeUpdate(result)
    } else {
      return handleTimeUpdate(result)
    }
  }

  return (
    <div
      onMouseUp={handleSliderUpdate}
      className="instrumental-player-slider"
      id="volume-container"
    >
      <div ref={slider} className="instrumental-player-slider__state">
        <div
          draggable="true"
          onDragStart={handleStartOfSliderDrag}
          onDrag={handleSliderDrag}
          onDragEnd={handleEndOfSliderDrag}
          className="instrumental-player-slider__circle"
        >
        </div>
      </div>
    </div>
  )
}

export default InstrumentalPlayerSlider;
