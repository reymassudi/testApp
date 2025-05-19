'use client';

import WeekEventsCalendar from './components/WeekEventsCalendar';
import { validateDate } from '@/utils/functions';

import './calendar.scss';
import { useEffect, useState } from 'react';
import { getWeekEvents } from '@/actions/calendar';
import moment from 'moment-jalaali';

export default function ThisWeek({ defaultDate, isShamsi }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let startDate = defaultDate ? new Date(defaultDate) : new Date();
    if (isShamsi) {
      startDate = moment(defaultDate);
    }

    const { data } = await getWeekEvents(startDate, isShamsi);
    setData(data);
  };

  const defaultObject = new Date(defaultDate);
  const weekDate = validateDate(defaultObject) ? defaultObject : new Date();
  weekDate.setHours(0);
  weekDate.setMinutes(0);

  return (
    <>
      <div className="this-week-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>

      {data && (
        <WeekEventsCalendar
          data={data}
          defaultDate={weekDate}
          isShamsi={isShamsi}
        />
      )}
    </>
  );
}
