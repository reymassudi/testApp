'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { convertUTCToLocalTime, getTimeOfDate } from '@/utils/functions';

import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';
import TimeClock from '@/public/icons/time-clock.svg';
import MessageAlert from '@/public/icons/message-alert.svg';

export default function DailyEvent({ data, disabled }) {
  const t = useTranslations();
  const [time, setTime] = useState({
    hour: '',
    minute: '',
    afterMidday: false,
  });

  useEffect(() => {
    if (data?.date) {
      const dateObject = convertUTCToLocalTime(new Date(data?.date), true);
      const initialTime = getTimeOfDate(dateObject);
      setTime(initialTime);
    }
  }, [data]);

  return (
    <div className="insight-details mx-5">
      <div className="flex justify-between w-full p-4">
        <div>
          <div className="flex items-center mb-1">
            <TimeClock className="time-clock" />
            <p className="h9 text-gray-600">
              {time?.hour ? (
                <>
                  <span>
                    {time?.hour}:{time?.minute}
                  </span>{' '}
                  <span className="uppercase inline-block">
                    {time?.afterMidday
                      ? t('calendar.midday_after')
                      : t('calendar.midday_before')}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex items-center">
            <MessageAlert className="message-alert" />
            <p className="body-3 text-gray-600">{data?.title}</p>
          </div>
        </div>
        {disabled ? (
          <p className="text-ultraviolet h8">
            {t('general.edit', { var: '' })}
          </p>
        ) : (
          <Link
            href={`${urls.addEvent}?${searchQueries.eventId}=${data?.id}`}
            className="text-ultraviolet h8"
          >
            {t('general.edit', { var: '' })}
          </Link>
        )}
      </div>
    </div>
  );
}
