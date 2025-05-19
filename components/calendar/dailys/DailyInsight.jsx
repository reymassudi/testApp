'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import PlusIcon from '@/public/icons/plus.svg';

export default function DailyInsight({
  title,
  type,
  addLink,
  analyseLink,
  children,
  disabled,
}) {
  const t = useTranslations();

  return (
    <div className={`daily-insight mb-6 ${type}${disabled ? ' disabled' : ''}`}>
      <div className="flex justify-between items-center w-full mb-2">
        <div className="flex items-center">
          <div className="insight-circle" />
          <p className="body-3 text-gray-600">{title}</p>
        </div>

        <div className="flex items-center">
          {analyseLink && (
            <Link href={analyseLink} className="analyse-link h10 me-2">
              {t('calendar.analysis')}
            </Link>
          )}

          {addLink && !disabled && (
            <Link href={addLink}>
              <PlusIcon className="plus-icon" />
            </Link>
          )}
          {disabled && <PlusIcon className="plus-icon" />}
        </div>
      </div>

      {children}
    </div>
  );
}
