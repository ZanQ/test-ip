import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap';

/*
   This Component builds the Image Carousel which is used for the Story Details.
*/

const Slideshow = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  if ((props.items) && (props.items.length > 0)) {
    const slides = props.items.map((item) => {
          return (
          <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={item.src}
          >
              <img src={item.src} className="carouselimage" alt={item.altText} />
          </CarouselItem>
          );
    });
   
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={props.items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }

  else {

    return (
      ""
    )
  }
}

export default Slideshow;
