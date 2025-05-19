import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getTips } from '@/actions/home';
import { getPregnancyWeek } from '@/utils/functions';

import BlockQuoteStart from '@/public/icons/block-quote-start.svg';
import BlockQuoteEnd from '@/public/icons/block-quote-end.svg';

export default function WeeksTips({ days }) {
  const t = useTranslations();
  const [tip, setTip] = useState('');

  const getTip = async () => {
    const { data } = await getTips(getPregnancyWeek(days));
    setTip(data?.tip);
  };

  useEffect(() => {
    getTip();
  }, [days]);

  if (tip) {
    return (
      <div className="week-tips mt-4">
        <h4 className="text-center mb-4">{t('home.week_tips_title')}</h4>

        <div className="tip-card grid grid-cols-[24px_1fr_24px] gap-2">
          <div>
            <BlockQuoteStart />
          </div>
          <p className="body-2 text-white text-center">{tip}</p>
          <div className="self-end">
            <BlockQuoteEnd />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
