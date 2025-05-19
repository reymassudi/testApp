'use client';

import { useTranslations } from 'next-intl';

import Miserable from '@/public/img/moods/miserable.svg';
import Down from '@/public/img/moods/down.svg';
import Neutral from '@/public/img/moods/neutral.svg';
import Good from '@/public/img/moods/good.svg';
import Great from '@/public/img/moods/great.svg';

const moods = [
  {
    value: 'miserable',
    title: 'statics.moods_daily.miserable',
    Img: Miserable,
    color: '#A6D1FF',
    me: 0,
  },
  {
    value: 'down',
    title: 'statics.moods_daily.down',
    Img: Down,
    color: '#A79BF2',
    me: '-8px',
  },
  {
    value: 'neutral',
    title: 'statics.moods_daily.neutral',
    Img: Neutral,
    color: '#FFDF84',
    me: 0,
  },
  {
    value: 'good',
    title: 'statics.moods_daily.good',
    Img: Good,
    color: '#F89B94',
    me: '1px',
  },
  {
    value: 'great',
    title: 'statics.moods_daily.great',
    Img: Great,
    color: '#D3E8D6',
    me: '-10px',
  },
];

export default function DailyMood({ data }) {
  const t = useTranslations();

  const activeIndex = moods?.findIndex((mood) => mood.value === data?.overall);

  return (
    <div className="insight-details mx-5">
      <div className="daily-moods">
        <div className="mood-square-container px-1">
          {moods?.map(({ value, title, Img, color }, index) => (
            <div
              className={`mood-square${index === activeIndex ? ' active' : ''}`}
              key={value}
              style={{ backgroundColor: color }}
            >
              <Img />
              {index === activeIndex && (
                <p className="body-5 mt-0.5">{t(title)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mood-lines-container px-2 mt-2">
          {moods?.map(({ value, color, me }, index) => {
            const isActive = activeIndex === index;
            const isAfterActive = index > activeIndex;
            const width = isActive
              ? '100%'
              : `calc(${data?.scores[value] * 200}% + 6px)`;

            return (
              <div
                className={`mood-line-container${isActive ? ' active' : ''}${isAfterActive ? ' after-active' : ''}`}
                key={`mood-line-${value}`}
                style={{ marginInlineStart: me }}
              >
                <div
                  className="mood-line"
                  style={{ backgroundColor: color, width: width }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
