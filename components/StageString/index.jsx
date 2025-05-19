'use client';

import { useTranslations } from 'next-intl';
import { getPregnancyWeek } from '@/utils/functions';

export default function StageString({ num, tKey }) {
  const t = useTranslations();

  const getStageString = () => {
    let numString;

    if (num === 7) {
      numString = t('home.pregnancy_stage_1w');
    } else if (num === 8) {
      numString = t('home.pregnancy_stage_1w_1d');
    } else {
      const weeks = Math.floor(num / 7);
      const days = num % 7;

      if (weeks === 1) {
        numString = t('home.pregnancy_stage_1w_d', { day: days });
      } else if (weeks && days) {
        numString =
          days === 1
            ? t('home.pregnancy_stage_w_1d', { week: weeks })
            : t('home.pregnancy_stage_w_d', { week: weeks, day: days });
      } else if (weeks) {
        numString = t('home.pregnancy_stage_w', { week: weeks });
      } else if (days) {
        numString = t('home.pregnancy_stage_d', { day: days });
      }
    }

    if (tKey) {
      return t(tKey, { num: numString });
    }
    return numString;
  };

  return getStageString();
}
