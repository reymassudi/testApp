'use client';

import { useEffect, useState } from 'react';
import moment from 'moment-jalaali';
import { useDatepicker } from '@/components/Datepicker';
import { shamsiToUtcDay } from '@/utils/functions';

import { locales } from '@/utils/constants/enums';
import ChevronLeft from '@/public/icons/chevron-left.svg';
import ChevronRight from '@/public/icons/chevron-right.svg';
import VioletHeart from '@/public/img/calendar/violet-heart.svg';
import Balloons from '@/public/img/calendar/balloons.svg';

export default function CalendarDatePicker({
  data,
  calendarMonth,
  styles,
  onMonthChange,
  onDateChange,
  specialDates,
}) {
  const { getMonthDays, locale, days, months, isRTL } = useDatepicker();
  const isShamsi = locale === locales.persian;

  const [displayDate, setDisplayDate] = useState(calendarMonth || new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (currentIndex === 1 || currentIndex === -1) {
      // transition is already enabled by default
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // disable transition BEFORE resetting
        setCurrentIndex(0); // reset position immediately (no animation)

        let newDate;
        if (isShamsi) {
          const shamsiNewDate = shamsiDisplay;
          if (currentIndex === 1) {
            shamsiNewDate.add(1, 'jMonth');
          } else {
            shamsiNewDate.subtract(1, 'jMonth');
          }
          shamsiNewDate.jDate(1);
          newDate = shamsiNewDate.toDate();
        } else {
          newDate = displayDate;
          newDate.setDate(1);
          newDate.setMonth(newDate.getMonth() + currentIndex);
        }
        setDisplayDate(newDate);

        // change month after layout shift to avoid visual flash
        setTimeout(() => {
          setIsTransitioning(true); // re-enable transition
        }, 100);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  function getIsDaySelected(day, month, year) {
    if (calendarMonth) {
      // if (isShamsi) {
      //   const today = moment();
      //   return today.jMonth() + 1 === month && today.jDate() === day;
      // } else {
      //   const today = new Date();
      //   return month === today.getMonth() + 1 && day === today.getDate();
      // }

      const today = new Date();
      return month === today.getMonth() + 1 && day === today.getDate();
    }

    if (isShamsi) {
      return (
        shamsiDisplay.jYear() === year &&
        shamsiDisplay.jMonth() === month &&
        shamsiDisplay.jDate() === day
      );
    }

    return (
      month === displayDate.getMonth() &&
      day === displayDate.getDate() &&
      year === displayDate.getFullYear()
    );
  }

  const onDateClick = (day) => {
    if (onDateChange) {
      let newDate;

      if (isShamsi) {
        newDate = moment(displayDate).jDate(day).toDate();
      } else {
        newDate = new Date();
        newDate.setDate(day);
        newDate.setMonth(displayDate.getMonth());
        newDate.setFullYear(displayDate.getFullYear());
      }

      onDateChange(newDate);
      setDisplayDate(newDate);
    }
  };

  const handleNext = () => {
    setCurrentIndex(1);
    let newDate;

    if (isShamsi) {
      newDate = moment(displayDate);
      newDate.add(1, 'jMonth');
    } else {
      newDate = new Date(displayDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
    }

    onMonthChange(newDate);
  };

  const handlePrev = () => {
    setCurrentIndex(-1);
    let newDate;

    if (isShamsi) {
      newDate = moment(displayDate);
      newDate.subtract(1, 'jMonth');
    } else {
      newDate = new Date(displayDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() - 1);
    }

    onMonthChange(newDate);
  };

  const renderDays = (customDate = displayDate) => {
    const days = [];
    let today = new Date();

    let { firstDay, daysInMonth, year, month } = getMonthDays(customDate);

    if (calendarMonth) {
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`day-${i}`} className="date-picker-day body-3" />);
      }
    } else {
      const prevMonthLastDay = isShamsi
        ? moment.jDaysInMonth(
            year,
            moment(customDate).subtract(1, 'jMonth').jMonth(),
          )
        : new Date(year, month, 0).getDate();

      for (let i = firstDay - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        days.push(
          <div
            key={`prev-${month - 1}-${i}`}
            className="date-picker-day body-3 date-disabled"
          >
            {day}
          </div>,
        );
      }
    }

    const todayMoment = moment.utc(today); // today in UTC

    let isMonthBefore;
    if (isShamsi) {
      isMonthBefore =
        todayMoment.jYear() > year ||
        (todayMoment.jYear() === year && todayMoment.jMonth() > month);
    } else {
      isMonthBefore =
        today.getFullYear() > year ||
        (today.getFullYear() === year && today.getMonth() > month);
    }

    const birthDate = specialDates?.birth_date
      ? isShamsi
        ? moment(specialDates.birth_date)
        : new Date(specialDates.birth_date)
      : null;
    const isBirthMonth = isShamsi
      ? birthDate && birthDate.jYear() === year && birthDate.jMonth() === month
      : birthDate &&
        birthDate.getFullYear() === year &&
        birthDate.getMonth() === month;

    for (let day = 1; day <= daysInMonth; day++) {
      let isSameYear, isSameMonth, isBefore, isToday, hasEvent, isBirthDay;

      if (isShamsi) {
        isSameYear = todayMoment.jYear() === year;
        isSameMonth = todayMoment.jMonth() === month;
        isBefore =
          isMonthBefore ||
          (isSameYear && isSameMonth && todayMoment.jDate() > day);
        isToday = isSameYear && isSameMonth && todayMoment.jDate() === day;
        const utcDate = shamsiToUtcDay(year, month, day);
        hasEvent = data && !!data[utcDate];
        isBirthDay = isBirthMonth && birthDate?.jDate() === day;
      } else {
        isSameYear = today.getFullYear() === year;
        isSameMonth = today.getMonth() === month;
        isBefore =
          isMonthBefore || (isSameYear && isSameMonth && today.getDate() > day);
        isToday = isSameYear && isSameMonth && today.getDate() === day;
        hasEvent = data && !!data[day];
        isBirthDay = isBirthMonth && birthDate?.getDate() === day;
      }

      const isSelected = getIsDaySelected(day, month, year);

      if (isBirthDay) {
        days.push(
          <label
            key={`${month}-${day}`}
            className={`relative date-picker-day body-3${isBefore ? ' date-disabled' : ''}${hasEvent ? ' date-has-event' : ''}`}
          >
            <input type="checkbox" className="hidden peer" />
            <Balloons className="baby-balloons" />
            <VioletHeart className="z-10 absolute baby-bday-heart" />
            <span className="relative z-20 text-white">{day}</span>
          </label>,
        );
      } else {
        days.push(
          <div
            key={`${month}-${day}`}
            className={`date-picker-day body-3${isBefore ? ' date-disabled' : ''}${hasEvent ? ' date-has-event' : ''}${isSelected && !isToday ? ' date-picked-calendar' : ''}${isToday ? ' date-picked' : ''}`}
            onClick={() => onDateClick(day)}
          >
            {day}
          </div>,
        );
      }
    }

    if (!calendarMonth) {
      const totalCells = days.length;
      const nextMonthDaysNeeded = 7 - (totalCells % 7 || 7);

      for (let i = 1; i <= nextMonthDaysNeeded; i++) {
        days.push(
          <div
            key={`next-${month + 1}-${i}`}
            className="date-picker-day body-3 date-disabled"
          >
            {i}
          </div>,
        );
      }
    }

    return days;
  };

  const renderMonth = (offset) => {
    let date;
    if (isShamsi) {
      date = moment(displayDate)
        .clone()
        .startOf('jMonth')
        .add(offset, 'jMonth');
    } else {
      date = new Date(displayDate);
      date.setMonth(date.getMonth() + offset);
    }
    return renderDays(date);
  };

  const shamsiDisplay = moment(displayDate);

  return (
    <div className={`calendar-day ${styles ? styles : ''}`}>
      <div className="flex w-full justify-between items-center mb-8">
        {!calendarMonth && (
          <div onClick={handlePrev} className="rtl:scale-[-1.1]">
            <ChevronLeft />
          </div>
        )}

        <h4 className="text-center w-full">
          {months[isShamsi ? shamsiDisplay?.jMonth() : displayDate.getMonth()]}{' '}
          {isShamsi ? shamsiDisplay?.jYear() : displayDate.getFullYear()}
        </h4>

        {!calendarMonth && (
          <div onClick={handleNext} className="rtl:scale-[-1.1]">
            <ChevronRight />
          </div>
        )}
      </div>

      <div>
        {calendarMonth ? (
          <div className="calendar-days">{renderMonth(0)}</div>
        ) : (
          <div className="overflow-hidden">
            <div className="week-days">
              {days.map((day, index) => (
                <div
                  className="datepicker-week-day body-3"
                  key={`week-day-${index}`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div
              className={`flex items-start h-[235px]${isTransitioning ? ' transition-transform duration-300 ease-in-out' : ''}`}
              style={{
                width: '300%',
                transform: `translateX(${isRTL ? '' : '-'}${((currentIndex + 1) * 100) / 3}%)`,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <div className="calendar-days">{renderMonth(-1)}</div>
              <div className="calendar-days">{renderMonth(0)}</div>
              <div className="calendar-days">{renderMonth(1)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
