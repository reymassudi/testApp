import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { getPregnancyWeek } from '@/utils/functions';

import { WeekContext } from '@/utils/context';
import { pregnancy_total_weeks } from '@/utils/constants';

import ChevronLeft from '@/public/icons/chevron-left.svg';
import ChevronRight from '@/public/icons/chevron-right.svg';
import './weeks-progress.css';

export default function WeeksProgress() {
  const t = useTranslations();
  const { currentWeek, setCurrentWeek, motherData } = useContext(WeekContext);

  const totalWeeks = pregnancy_total_weeks;
  const trimesters = [1, 2, 3];
  const totalWeeksOfBar = totalWeeks / trimesters.length;

  const handlePrev = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNext = () => {
    if (currentWeek < totalWeeks) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handleToCurrent = () => {
    setCurrentWeek(getPregnancyWeek(motherData.pregnancy_days));
  };

  return (
    <div className="progress-container w-full text-center">
      <p className="text-center text-gray-800 h7 mb-2">
        {t('home.pregnancy_progress_week', { week: currentWeek })}
      </p>

      <div className="grid grid-cols-[24px_1fr_1fr_1fr_24px] items-center gap-1">
        <div onClick={handlePrev} className="rtl:scale-[-1.1]">
          <ChevronLeft />
        </div>

        {trimesters.map((t, i) => {
          const barTotal = totalWeeksOfBar * t;
          const barWeeks = currentWeek - totalWeeksOfBar * i;

          const progressPercentage =
            currentWeek >= barTotal
              ? 100
              : Math.max(0, (barWeeks / totalWeeksOfBar) * 100);

          return (
            <div className="progress-bar-line" key={`tri-${i}`}>
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          );
        })}

        <div onClick={handleNext} className="rtl:scale-[-1.1]">
          <ChevronRight />
        </div>
      </div>

      <button
        className="button-ultraviolet-outlined button-small mt-4 w-auto px-6"
        onClick={handleToCurrent}
      >
        {t('home.back_to_week')}
      </button>
    </div>
  );
}
