import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import pap from "../Images/pp.webp"; // Image 1
import joz from "../Images/joz.png"; // Image 2
import bna from "../Images/bna.webp"; // Image 3
const items = [
  {
    src: pap,
    altText:
      "Aids digestion, boosts immunity, improves skin health, and protects the heart.",
    caption: "Papaya ",
    key: 1,
    className: "c-img",
  },
  {
    src: joz,
    altText:
      "Hydrates the body, supports brain health, nourishes skin and hair, and provides quick energy..",
    caption: "Coconut ",
    key: 2,
    className: "c-img",
  },
  {
    src: bna,
    altText:
      "Provides energy, strengthens bones, calms nerves, and enhances immunity.",
    caption: "Milk Banana:",
    key: 3,
    className: "c-img",
  },
];

function Console(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Map each item to a CarouselItem
  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key} // Use the key to make it unique
    >
      <img src={item.src} alt={item.altText} className={item.className} />
      <CarouselCaption
        captionText={item.altText}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Console;
