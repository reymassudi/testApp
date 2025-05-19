'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function MoodItem({ mood, onMoodClick, onScoreClick }) {
  const t = useTranslations();
  const [isSelected, setSelected] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setRatingOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onItemClick = () => {
    setRatingOpen(!isSelected);
    setSelected(!isSelected);
    onMoodClick({ mood: mood?.value, score: rating });
  };

  const onRatingClick = (level) => {
    setRating(level);
    onScoreClick({ mood: mood?.value, score: level });
  };

  return (
    <div className="mood-item-container" ref={wrapperRef}>
      {mood && (
        <div
          className={`mood-item${isSelected ? ' selected' : ''}`}
          onClick={onItemClick}
        >
          <mood.Img />

          <p className="body-3 text-gray-700 ms-2">{t(mood?.title)}</p>
        </div>
      )}

      {ratingOpen && (
        <div className="mood-grader">
          {[1, 2, 3, 4, 5].map((level) => (
            <Fragment key={level}>
              <div
                className={`grader-dot h10${rating === level ? ' active' : ''}${
                  level < rating ? ' before-active' : ''
                }`}
                onClick={() => onRatingClick(level)}
              >
                {level}
              </div>
              {level !== 5 && (
                <span
                  className={`grader-line${level < rating ? ' active' : ''}`}
                ></span>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
