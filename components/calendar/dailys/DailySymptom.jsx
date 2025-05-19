'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SymptomItem from '@/components/calendar/SymptomItem';

import { urls } from '@/utils/constants/navigation';
import PlusIcon from '@/public/icons/plus.svg';

export default function DailySymptom({ data, today }) {
  const t = useTranslations();

  return (
    <div className="insight-details mx-5">
      <div className="x-infinite-scroll-container smooth-scroll py-2">
        {today && (
          <Link
            href={urls.addSymptom}
            className="x-infinite-scroll-item symptom-item-add"
          >
            <p className="h9 text-gray-700 whitespace-normal">
              {t('calendar.log_symptom')}
            </p>
            <div className="symptom-plus">
              <PlusIcon className="plus-icon" />
            </div>
          </Link>
        )}

        {data?.map((symptom) => (
          <SymptomItem type={symptom} key={symptom} />
        ))}
      </div>
    </div>
  );
}
