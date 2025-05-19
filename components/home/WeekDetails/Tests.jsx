import { useLocale, useTranslations } from 'next-intl';
import { useContext } from 'react';
import TestCard from '@/components/home/TestCard';
import { ordinalNumberToWords } from '@/utils/functions';

import { WeekContext } from '@/utils/context';
import { locales } from '@/utils/constants/enums';

const testData = [
  {
    title: 'Blood test (hCG levels)',
    description:
      'Confirms pregnancy and checks if hCG levels are rising normally.',
    testChecked: false,
  },
  {
    title: 'Complete Blood Count (CBC)',
    description: 'Detects anemia, infections, or low platelet levels.',
    testChecked: true,
  },
];

const testDataFa = [
  {
    title: 'آزمایش خون (سطوح hCG)',
    description:
      'بارداری را تأیید کرده و بررسی می‌کند که آیا سطح hCG به‌طور طبیعی در حال افزایش است.',
    testChecked: false,
  },
  {
    title: 'آزمایش خون کامل (CBC)',
    description: 'کم‌خونی، عفونت‌ها و پایین بودن پلاکت‌ها را شناسایی می‌کند.',
    testChecked: true,
  },
];

export default function Tests() {
  const t = useTranslations();
  const { currentWeek } = useContext(WeekContext);

  // will be removed
  const locale = useLocale();

  const data = locale === locales.persian ? testDataFa : testData;

  return (
    <div className="tests mt-8">
      <div className="d-flex mb-4">
        <h6 className="inline">{t('home.necessary_tests')}</h6>
        {currentWeek && (
          <span className="body-2 text-gray-600 ms-2">
            {t('pregnancy.week_number', {
              num: ordinalNumberToWords(currentWeek, locale),
            })}
          </span>
        )}
      </div>

      <div>
        {data.map((test, index) => (
          <TestCard {...test} key={`test-${index}`} />
        ))}
      </div>
    </div>
  );
}
