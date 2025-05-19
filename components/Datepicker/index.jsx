'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, createContext, useContext } from 'react';
import moment from 'moment-jalaali';
import ModalDatePicker from './components/ModalDatepicker';
import WeeklyDatePicker from './components/WeeklyDatepicker';
import CalendarDatePicker from './components/CalendarDatepicker';

import { locales } from '@/utils/constants/enums';
import './datepicker.scss';

const DateContext = createContext(null);

export default function DatePicker({
  name,
  styles,
  onDateChange,
  onWeekChange,
  onMonthChange,
  defaultValue,
  value,
  calendarMonth,
  type,
  data,
  disableLastDays,
  specialDates,
}) {
  const t = useTranslations();
  const [isRTL, setIsRTL] = useState(false);

  const days = [
    t('statics.cal_days.1'),
    t('statics.cal_days.2'),
    t('statics.cal_days.3'),
    t('statics.cal_days.4'),
    t('statics.cal_days.5'),
    t('statics.cal_days.6'),
    t('statics.cal_days.7'),
  ];
  const months = [
    t('statics.cal_month.1'),
    t('statics.cal_month.2'),
    t('statics.cal_month.3'),
    t('statics.cal_month.4'),
    t('statics.cal_month.5'),
    t('statics.cal_month.6'),
    t('statics.cal_month.7'),
    t('statics.cal_month.8'),
    t('statics.cal_month.9'),
    t('statics.cal_month.10'),
    t('statics.cal_month.11'),
    t('statics.cal_month.12'),
  ];

  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date(),
  );
  const [inputValue, setInputValue] = useState(
    defaultValue ? new Date(defaultValue) : null,
  );

  useEffect(() => {
    // Only check for RTL on the client-side
    if (typeof document !== 'undefined') {
      setIsRTL(document.dir === 'rtl');
    }
  }, []);

  const locale = useLocale();

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (locale === locales.persian) {
      moment.loadPersian({
        dialect: 'persian-modern',
        useGregorianParser: true,
      });
    }
  }, []);

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      setInputValue(value);
      setSelectedDate(value);
    }
  }, [value]);

  const handleYearChange = (year) => {
    let date;
    if (locale === locales.persian) {
      date = new Date(selectedDate);
      date.setFullYear(year);
    } else {
      date = new Date(year, selectedDate.getMonth(), selectedDate.getDate());
    }

    setSelectedDate(date);
  };

  const handleMonthChange = (monthIndex) => {
    const date =
      locale === locales.persian
        ? moment(selectedDate).jMonth(monthIndex).toDate()
        : new Date(
            selectedDate.getFullYear(),
            monthIndex,
            selectedDate.getDate(),
          );

    setSelectedDate(date);
  };

  const handleDateChange = (day) => {
    let date;

    if (typeof day === 'object') {
      date = day;
    } else {
      if (locale === locales.persian) {
        const jYear = moment(selectedDate).jYear();
        const jMonth = moment(selectedDate).jMonth();
        date = moment(
          `${jYear}/${jMonth + 1}/${day}`,
          'jYYYY/jMM/jDD',
        ).toDate();
      } else {
        date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          day,
        );
      }
    }

    setSelectedDate(date);
    return date;
  };

  const getMonthDays = (customDate = selectedDate) => {
    let year, month, firstDay, daysInMonth;

    if (locale === locales.persian) {
      year = moment(customDate).jYear();
      month = moment(customDate).jMonth();
      firstDay =
        (moment(`${year}/${month + 1}/01`, 'jYYYY/jMM/jDD').day() + 1) % 7;
      daysInMonth = moment.jDaysInMonth(year, month);
    } else {
      year = customDate.getFullYear();
      month = customDate.getMonth();
      firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start
      daysInMonth = new Date(year, month + 1, 0).getDate();
    }

    return { firstDay, daysInMonth, year, month };
  };

  const getIsDaySelected = (day, month, year) => {
    if (locale === locales.persian) {
      const selectedShamsi = moment(selectedDate);

      return (
        day === selectedShamsi.jDate() &&
        month === selectedShamsi.jMonth() &&
        year === selectedShamsi.jYear()
      );
    }

    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  return (
    <DateContext.Provider
      value={{
        getMonthDays,
        getIsDaySelected,
        handleDateChange,
        handleMonthChange,
        handleYearChange,
        selectedDate,
        setSelectedDate,
        inputValue,
        setInputValue,
        locale,
        days,
        months,
        isRTL,
      }}
    >
      {type === 'weekly' && (
        <WeeklyDatePicker
          data={data}
          onWeekChange={onWeekChange}
          onDateChange={onDateChange}
        />
      )}
      {type === 'calendar' && (
        <CalendarDatePicker
          data={data}
          calendarMonth={calendarMonth}
          styles={styles}
          onMonthChange={onMonthChange}
          onDateChange={onDateChange}
          specialDates={specialDates}
        />
      )}
      {type === 'modal' && (
        <ModalDatePicker
          name={name}
          styles={styles}
          disableLastDays={disableLastDays}
          onDateChange={onDateChange}
        />
      )}
    </DateContext.Provider>
  );
}

export function useDatepicker() {
  return useContext(DateContext);
}
