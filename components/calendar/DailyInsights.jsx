'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  DailyEvent,
  DailyInsight,
  DailyMood,
  DailySymptom,
  DailyTest,
} from '@/components/calendar/dailys';
import { isDatesAfterToday, isDatesSameDay } from '@/utils/functions';

import { eventTypes, searchQueries } from '@/utils/constants/enums';
import { urls } from '@/utils/constants/navigation';
import '@/components/articles/articles.scss';

export default function DailyInsights({ data, moodSymptom, date, justEvent }) {
  const t = useTranslations();
  const [clientDate, setClientDate] = useState(null);

  useEffect(() => {
    setClientDate(new Date(date));
  }, [date]);

  const today = isDatesSameDay(date, new Date());
  const afterToday = isDatesAfterToday(date, new Date());
  const calendarDisabled = !today && !afterToday;

  return (
    <div className={`mt-10 px-4${calendarDisabled ? ' opacity-80' : ''}`}>
      <p className="h7 mb-6">{t('calendar.daily_insights')}</p>

      <div className="px-2">
        {clientDate ? (
          <>
            <DailyInsight
              type="event"
              title={t('calendar.doctor_appointment')}
              addLink={`${urls.addEvent}?${searchQueries.eventDate}=${clientDate?.toISOString()}`}
              disabled={calendarDisabled}
            >
              {data?.event?.map((item) => (
                <DailyEvent
                  data={item}
                  key={`appointment_${item?.id}`}
                  disabled={calendarDisabled}
                />
              ))}
            </DailyInsight>

            <DailyInsight
              type="other"
              title={t('home.necessary_tests')}
              addLink={`${urls.addEvent}?${searchQueries.eventType}=${eventTypes.test}&${searchQueries.eventDate}=${clientDate?.toISOString()}`}
              disabled={calendarDisabled}
            >
              {data?.test?.map((item) => (
                <DailyTest data={item} key={`test_${item?.id}`} />
              ))}
            </DailyInsight>
          </>
        ) : null}

        {!justEvent ? (
          <>
            <DailyInsight
              type="other"
              title={t('calendar.symptoms')}
              addLink={urls.addSymptom}
              disabled={!today}
            >
              {(moodSymptom?.symptom?.symptoms?.length > 0 || today) && (
                <DailySymptom
                  data={moodSymptom?.symptom?.symptoms}
                  today={today}
                />
              )}
            </DailyInsight>

            <DailyInsight
              type="other"
              title={t('calendar.daily_mood')}
              addLink={urls.addMood}
              disabled={!today}
            >
              {moodSymptom?.mood?.moods?.length ? (
                <DailyMood data={moodSymptom?.mood} />
              ) : null}
            </DailyInsight>
          </>
        ) : null}

        {/*<DailyInsight type="other related-article" title="Related articles">*/}
        {/*  <div className="mx-5">*/}
        {/*    <ArticleCard*/}
        {/*      title={'Title of articles'}*/}
        {/*      summary={*/}
        {/*        'Short demo of article.Short demo of article.Short demo of article.Short Short demo of article.Short demo of article.Short demo of article.Short'*/}
        {/*      }*/}
        {/*      study_time={43}*/}
        {/*      id={2}*/}
        {/*      fullWidth*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</DailyInsight>*/}
      </div>
    </div>
  );
}
