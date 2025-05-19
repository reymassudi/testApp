'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/Datepicker';
import DailyInsights from '@/components/calendar/DailyInsights';
import { getMoodSymptom, getWeekEvents } from '@/actions/calendar';
import { getWeekFirstDate } from '@/utils/functions';

import { urls } from '@/utils/constants/navigation';
import Calendar from '@/public/icons/calendar-full.svg';

export default function WeekEventsCalendar({ data, defaultDate, isShamsi }) {
  const t = useTranslations();
  const [weekData, setWeekData] = useState({
    data,
    date: defaultDate ? defaultDate : new Date(),
  });
  const [dateMoodSymptom, setDateMoodSymptom] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    onDateChange(weekData?.date);
  }, [weekData]);

  const onDateChange = (date) => {
    const dateObject = new Date(date);
    getDateMoodSymptom(dateObject);
    const day = dateObject.getDate();
    const dayEvents = weekData?.data[day] ? weekData?.data[day] : [];
    setEvents(dayEvents);

    dateObject.setHours(0);
    dateObject.setMinutes(0);
    setSelectedDate(dateObject);
  };

  const getDateMoodSymptom = async (date) => {
    const { data, ok } = await getMoodSymptom(date);

    if (ok) {
      setDateMoodSymptom(data);
    } else {
      setDateMoodSymptom({});
    }
  };

  const onWeekChange = async (date) => {
    const { data } = await getWeekEvents(date, isShamsi);

    const monday = getWeekFirstDate(date, isShamsi);
    setWeekData({ data, date: monday });
  };

  return (
    <div className="calendar-page">
      {selectedDate && (
        <>
          <div className="this-week">
            <div className="flex justify-between items-center w-full px-4 mb-8">
              <h4>{t('calendar.this_week')}</h4>

              <Link
                href={urls.calendarFull}
                className="body-3 text-gray-600 flex"
              >
                {t('calendar.full_calendar')}
                <Calendar className="calendar-icon ms-2" />
              </Link>
            </div>

            <DatePicker
              type="weekly"
              defaultValue={selectedDate}
              data={weekData?.data}
              onDateChange={onDateChange}
              onWeekChange={onWeekChange}
            />
          </div>

          <DailyInsights
            data={events}
            date={selectedDate}
            moodSymptom={dateMoodSymptom}
          />
        </>
      )}
    </div>
  );
}
