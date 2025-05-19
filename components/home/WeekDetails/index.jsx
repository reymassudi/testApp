'use client';

import { useEffect, useState } from 'react';
import WeekStage from './WeekStage';
import WeeksTips from './WeekTips';
import Tests from './Tests';
import ArticleList from '@/components/articles/ArticleList';
import { getPregnancyWeek } from '@/utils/functions';

import { WeekContext } from '@/utils/context';

export default function WeekDetails({ motherData, isRTL, articles }) {
  const days = motherData?.pregnancy_days;
  const [currentWeek, setCurrentWeek] = useState();

  useEffect(() => {
    setCurrentWeek(getPregnancyWeek(motherData?.pregnancy_days));
  }, [motherData]);

  return (
    <WeekContext.Provider
      value={{ motherData, currentWeek, setCurrentWeek, isRTL }}
    >
      <WeekStage />
      {days ? (
        <>
          <WeeksTips days={days} />
          <Tests />
        </>
      ) : null}
      <ArticleList currentWeek={currentWeek} data={articles} isHome />
    </WeekContext.Provider>
  );
}
