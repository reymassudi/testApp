'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import moment from 'moment-jalaali';
import { useDatepicker } from '@/components/Datepicker';
import { getWeekFirstDate, isDatesSameDay } from '@/utils/functions';

import { locales } from '@/utils/constants/enums';

export default function WeeklyDatePicker({ data, onWeekChange, onDateChange }) {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const { handleDateChange, selectedDate, setSelectedDate, isRTL } =
    useDatepicker();

  const locale = useLocale();
  const isShamsi = locale === locales.persian;

  useEffect(() => {
    if (locale) {
      const isShamsi = locale === locales.persian;

      if (isShamsi) {
        moment.loadPersian({
          dialect: 'persian-modern',
          useGregorianParser: true,
        });
      }

      let touchStartX = 0;
      let touchStartTime = 0;

      const minSwipeDistance = 50; // pixels
      const maxSwipeTime = 500; // ms

      const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
      };

      const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const deltaTime = Date.now() - touchStartTime;

        if (Math.abs(deltaX) > minSwipeDistance && deltaTime < maxSwipeTime) {
          // swipe right
          if (deltaX > 0) {
            isShamsi ? handleNext() : handlePrev();
          }
          // swipe left
          else {
            isShamsi ? handlePrev() : handleNext();
          }
        }
      };

      const swipeArea = document.getElementById('weekly-swipe-area');
      if (swipeArea) {
        swipeArea.addEventListener('touchstart', handleTouchStart);
        swipeArea.addEventListener('touchend', handleTouchEnd);
      }

      return () => {
        if (swipeArea) {
          swipeArea.removeEventListener('touchstart', handleTouchStart);
          swipeArea.removeEventListener('touchend', handleTouchEnd);
        }
      };
    }
  }, [locale]);

  useEffect(() => {
    if (currentIndex === 1 || currentIndex === -1) {
      const newDate = handleWeekChange();
      // transition is already enabled by default
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // disable transition BEFORE resetting
        setCurrentIndex(0); // reset position immediately (no animation)
        const monday = getWeekFirstDate(newDate, isShamsi);

        setSelectedDate(monday);

        // change month after layout shift to avoid visual flash
        setTimeout(() => {
          setIsTransitioning(true); // re-enable transition
        }, 100);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex(1);
  };
  const handlePrev = () => {
    setCurrentIndex(-1);
  };

  const handleWeekChange = () => {
    let newDate;
    if (isShamsi) {
      newDate = moment(selectedDate).add(currentIndex * 7, 'days');
    } else {
      newDate = selectedDate;
      newDate.setDate(newDate.getDate() + currentIndex * 7);
    }

    onWeekChange(newDate);
    return newDate;
  };

  const onDateClick = (day) => {
    const date = handleDateChange(day);
    onDateChange(date);
  };

  function getCurrentWeekDates(monday) {
    const weekDates = [];

    if (isShamsi) {
      const mMonday = moment(monday);
      for (let i = 0; i < 7; i++) {
        weekDates.push(mMonday.clone().add(i, 'days'));
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        weekDates.push(currentDay);
      }
    }

    return weekDates;
  }

  const renderDays = (monday) => {
    const days = [];
    let weekDates = getCurrentWeekDates(monday);

    for (let i = 0; i < 7; i++) {
      const day = weekDates[i];
      let isSelected, hasEvent;

      if (isShamsi) {
        isSelected = isDatesSameDay(day.toDate(), selectedDate);
        hasEvent = !!data[day.date()];
      } else {
        isSelected = isDatesSameDay(day, selectedDate);
        hasEvent = !!data[day.getDate()];
      }

      days.push(
        <div
          key={`day-${i}`}
          className={`weekly-day${isSelected ? ' date-picked' : ''}${hasEvent ? ' date-has-event' : ''}`}
          onClick={
            isShamsi ? () => onDateClick(day.toDate()) : () => onDateClick(day)
          }
        >
          <div className="body-3 mb-1">{t(`statics.cal_days.${i + 1}`)}</div>
          <h6>{isShamsi ? day.jDate() : day.getDate()}</h6>
        </div>,
      );
    }

    return days;
  };

  const renderWeek = (offset) => {
    let baseDate;

    if (isShamsi) {
      baseDate = moment(selectedDate).add(offset * 7, 'days');
    } else {
      baseDate = new Date(selectedDate);
      baseDate.setDate(baseDate.getDate() + offset * 7);
    }

    const monday = getWeekFirstDate(baseDate, isShamsi);

    return renderDays(monday);
  };

  return (
    <div id="weekly-swipe-area" className="overflow-hidden touch-pan-x">
      <div
        className={`flex items-start${isTransitioning ? ' transition-transform duration-300 ease-in-out' : ''}`}
        style={{
          width: '300%',
          transform: `translateX(${isRTL ? '' : '-'}${((currentIndex + 1) * 100) / 3}%)`,
        }}
      >
        <div className="weekly-calendar">{renderWeek(-1)}</div>
        <div className="weekly-calendar">{renderWeek(0)}</div>
        <div className="weekly-calendar">{renderWeek(1)}</div>
      </div>
    </div>
  );
}
