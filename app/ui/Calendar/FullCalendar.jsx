'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { getMonthEvents, getSpecialDates } from '@/actions/calendar';
import DatePicker from '@/components/Datepicker';
import InfiniteScroll from '@/components/InfiniteScroll';
import DailyInsights from '@/components/calendar/DailyInsights';

import { locales } from '@/utils/constants/enums';
import './calendar.scss';

export default function FullCalendar({ defaultDate }) {
  const t = useTranslations();
  const [calendarMode, setCalendarMode] = useState('month');
  const [events, setEvents] = useState([]);
  const [specialEvents, setSpecialEvents] = useState({});
  const [monthData, setMonthData] = useState({
    data: {},
    date: defaultDate ? defaultDate : new Date(),
  });
  const [yearData, setYearData] = useState({ months: [], data: [] });
  const [selectedDate, setSelectedDate] = useState();
  const yearRef = useRef({ months: [], data: [] });
  const modeRef = useRef('month');

  const locale = useLocale();
  const isShamsi = locale === locales.persian;

  useEffect(() => {
    getMonthData(new Date());
    getCalendarSpecialDates();
  }, []);

  useEffect(() => {
    onDateChange(monthData?.date);
  }, [monthData]);

  const onDateChange = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const dayEvents = monthData?.data[day] ? monthData?.data[day] : [];
    setEvents(dayEvents);

    dateObject.setHours(0);
    dateObject.setMinutes(0);
    setSelectedDate(dateObject);
  };

  const getMonthData = async (date) => {
    const { data } = await getMonthEvents(date, isShamsi);
    setMonthData({ data, date });
  };

  const getCalendarSpecialDates = async () => {
    const { data } = await getSpecialDates();
    setSpecialEvents(data);
  };

  useEffect(() => {
    if (calendarMode === 'year') {
      yearlyCalendarInit();
    } else {
      const tempData = { months: [], data: [] };
      setYearData(tempData);
      yearRef.current = tempData;
    }
  }, [calendarMode]);

  const yearlyCalendarInit = async () => {
    const thisMonth = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    const months = [prevMonth, thisMonth, nextMonth];

    const data_1 = await getMonthEvents(prevMonth, isShamsi);
    const data_2 = await getMonthEvents(thisMonth, isShamsi);
    const data_3 = await getMonthEvents(nextMonth, isShamsi);

    const tempData = {
      months,
      data: [data_1?.data, data_2?.data, data_3?.data],
    };
    setYearData(tempData);
    yearRef.current = tempData;
  };

  const onChangeMonth = async (month) => {
    await getMonthData(month);
  };

  const onLoadNewMonth = async (direction) => {
    if (modeRef.current === 'year' && yearRef.current?.data.length > 0) {
      const monthsCalendar = yearRef.current?.months;
      let newMonths = [],
        newData = [];

      if (direction === 'top') {
        const firstMonth = new Date(monthsCalendar[0]);
        for (let i = 1; i <= 3; i++) {
          const newMonth = new Date(firstMonth);
          newMonth.setMonth(firstMonth.getMonth() - i);
          newMonths.unshift(newMonth);
        }
        const data_1 = await getMonthEvents(newMonths[0], isShamsi);
        const data_2 = await getMonthEvents(newMonths[1], isShamsi);
        const data_3 = await getMonthEvents(newMonths[2], isShamsi);
        newData = [
          data_1?.data,
          data_2?.data,
          data_3?.data,
          ...yearRef?.current?.data,
        ];
        newMonths = [...newMonths, ...monthsCalendar];
      } else if (direction === 'bottom') {
        const lastMonth = new Date(monthsCalendar[monthsCalendar.length - 1]);
        for (let i = 1; i <= 3; i++) {
          const newMonth = new Date(lastMonth);
          newMonth.setMonth(lastMonth.getMonth() + i);
          newMonths.push(newMonth);
        }
        const data_1 = await getMonthEvents(newMonths[0], isShamsi);
        const data_2 = await getMonthEvents(newMonths[1], isShamsi);
        const data_3 = await getMonthEvents(newMonths[2], isShamsi);
        newData = [
          ...yearRef?.current?.data,
          data_1?.data,
          data_2?.data,
          data_3?.data,
        ];
        newMonths = [...monthsCalendar, ...newMonths];
      }

      const tempData = { months: newMonths, data: newData };
      yearRef.current = tempData;
      setYearData(tempData);
    }
  };

  const onChangeMode = (mode) => {
    modeRef.current = mode;
    setCalendarMode(mode);
  };

  return (
    <div className="calendar-page">
      <InfiniteScroll
        onLoad={onLoadNewMonth}
        hasScroll={calendarMode === 'year' && yearData?.data?.length > 0}
      >
        <div className="w-full mb-6">
          <h4 className="px-4 mb-4">{t('calendar.calendar')}</h4>

          <div className="text-end">
            <div className="calendar-mode-button">
              <div
                className="calendar-mode-slider"
                style={{
                  transform:
                    calendarMode === 'year'
                      ? isShamsi
                        ? 'translateX(-100%)'
                        : 'translateX(100%)'
                      : 'translateX(0%)',
                }}
              ></div>

              <div
                onClick={() => onChangeMode('month')}
                className={`body-3 calendar-mode-option text-center${
                  calendarMode === 'month' ? ' font-bold' : ''
                }`}
              >
                {t('calendar.month')}
              </div>

              <div
                onClick={() => onChangeMode('year')}
                className={`body-3 calendar-mode-option text-center${
                  calendarMode === 'year' ? ' font-bold' : ''
                }`}
              >
                {t('calendar.year')}
              </div>
            </div>
          </div>
        </div>

        {calendarMode === 'month' && (
          <DatePicker
            type="calendar"
            onMonthChange={onChangeMonth}
            defaultValue={new Date()}
            data={monthData?.data}
            onDateChange={onDateChange}
            specialDates={specialEvents}
          />
        )}

        {calendarMode === 'month' && selectedDate && (
          <DailyInsights data={events} date={selectedDate} justEvent />
        )}

        {calendarMode === 'year' &&
          yearData?.months.map((month, index) => (
            <DatePicker
              styles="mb-8"
              type="calendar"
              calendarMonth={month}
              key={month.toISOString()}
              data={yearData?.data[index]}
              specialDates={specialEvents}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}
