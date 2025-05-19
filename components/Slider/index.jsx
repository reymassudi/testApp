'use client';

import { useState, useEffect, useRef } from 'react';

import './slider.css';

const Slider = ({ slides, isRTL }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real slide
  const transitionRef = useRef(true);
  const sliderRef = useRef(null);
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]]; // Add duplicates

  // mobile touch
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const transferTime = 5000;
  const transitionTime = 7;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, transferTime);

    return () => clearInterval(interval);
  }, [isDragging]);

  useEffect(() => {
    if (currentIndex === 0) {
      // If going backward past the first slide, jump to the last real slide
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(slides.length);
      }, transitionTime * 100);
    } else if (currentIndex === extendedSlides.length - 1) {
      // If going forward past the last slide, jump to the first real slide
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(1);
      }, transitionTime * 100);
    } else {
      transitionRef.current = true;
    }
  }, [currentIndex, slides.length, extendedSlides.length]);

  // mobile touch
  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartPosition(event.touches[0].clientX);
    setPrevTranslate(-currentIndex * sliderRef.current.offsetWidth);
  };
  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const currentPosition = event.touches[0].clientX;
    const nextPosition = isRTL
      ? startPosition - currentPosition
      : currentPosition - startPosition;
    setCurrentTranslate(prevTranslate + nextPosition);
  };
  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setStartPosition(event.clientX);
    setPrevTranslate(-currentIndex * sliderRef.current.offsetWidth);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const currentPosition = event.clientX;
    const nextPosition = isRTL
      ? startPosition - currentPosition
      : currentPosition - startPosition;
    setCurrentTranslate(prevTranslate + nextPosition);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (movedBy > 50) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentTranslate(prevTranslate);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mouseleave', handleMouseUp);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);

      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging, currentTranslate]);

  return (
    <div className="slider-container grid grid-rows-[1fr_10px] gap-6">
      <div
        className="slider"
        ref={sliderRef}
        style={{
          transform: `translateX(${isRTL ? currentIndex * 100 : -currentIndex * 100}%)`,
          transition: transitionRef.current
            ? `transform 0.${transitionTime}s ease-in-out`
            : 'none',
        }}
      >
        {extendedSlides.map((Slide, index) => (
          <div className="slide" key={`slide-${index}`}>
            {Slide}
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={`slide-dot-${index}`}
            className={`dot ${index === currentIndex - 1 ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
