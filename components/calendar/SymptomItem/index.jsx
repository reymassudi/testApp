'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import symptoms from './symptoms-list';

export default function SymptomItem({ type, onClick }) {
  const t = useTranslations();
  const [isSelected, setSelected] = useState(false);

  const symptom = symptoms[type];

  const onItemClick = () => {
    if (onClick) {
      setSelected(!isSelected);
      onClick(symptom.value);
    }
  };

  return (
    <>
      {symptom && (
        <div
          className={`x-infinite-scroll-item symptom-item${isSelected ? ' selected' : ''}`}
          onClick={onItemClick}
        >
          <img
            src={symptom.img?.src}
            alt={symptom.title}
            className="symptom-img"
          />
          <div className="symptom-title">
            <p className="h9 whitespace-normal text-center text-white">
              {t(symptom?.title)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
