'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import moment from 'moment-jalaali';
import Modal from '@/components/Modal';
import { useDatepicker } from '@/components/Datepicker';
import {
  convertTimeToISO,
  isDatesAfterToday,
  isDatesSameDay,
} from '@/utils/functions';

import { locales } from '@/utils/constants/enums';
import Calendar from '@/public/icons/calendar.svg';

export default function ModalDatePicker({
  name,
  styles,
  onDateChange,
  disableLastDays,
}) {
  const t = useTranslations();
  const buttonRef = useRef(null);
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const {
    getMonthDays,
    getIsDaySelected,
    handleDateChange,
    handleMonthChange,
    handleYearChange,
    selectedDate,
    inputValue,
    setInputValue,
    locale,
    days,
    months,
  } = useDatepicker();

  const years = [new Date().getFullYear(), new Date().getFullYear() - 1]; // Last year and this year

  // Refs for outside click detection
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const isShamsi = locale === locales.persian;
  const today = isShamsi ? moment() : new Date();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setShowMonths(false);
      }

      if (
        yearRef.current &&
        !monthRef.current.contains(event.target) &&
        !yearRef.current.contains(event.target)
      ) {
        setShowYears(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onModalToggle = () => {
    buttonRef?.current.click();
  };

  const onDateClick = (day) => {
    handleDateChange(day);
  };

  const onMonthClick = (monthIndex) => {
    handleMonthChange(monthIndex);
    setShowMonths(false);
  };

  const onYearClick = (yearIndex) => {
    handleYearChange(yearIndex);
    setShowYears(false);
  };

  const renderDays = () => {
    const days = [];
    let { firstDay, daysInMonth, year, month } = getMonthDays();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`day-${i}`} className="date-picker-day body-3" />);
    }

    const dayObject = isShamsi ? moment() : new Date();
    if (isShamsi) {
      dayObject.jMonth(month);
      dayObject.jYear(year);
    } else {
      dayObject.setMonth(month);
      dayObject.setFullYear(year);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = getIsDaySelected(day, month, year);
      let isDisabled = false;

      if (disableLastDays) {
        if (isShamsi) {
          dayObject.jDate(day);
        } else {
          dayObject.setDate(day);
        }
        isDisabled =
          !isDatesAfterToday(dayObject, today, isShamsi) &&
          !isDatesSameDay(dayObject, today, isShamsi);
      }

      days.push(
        <div
          key={day}
          className={`date-picker-day body-3${isSelected ? ' date-picked' : ''}${isDisabled ? ' date-disabled' : ''}`}
          onClick={isDisabled ? null : () => onDateClick(day)}
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';

    if (locale === locales.persian) {
      return moment(date).format('jYYYY/jMM/jDD'); // Shamsi format
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat(locale, options);

    const formattedParts = formatter.formatToParts(date);
    const year = formattedParts.find((part) => part.type === 'year').value;
    const month = formattedParts.find((part) => part.type === 'month').value;
    const day = formattedParts.find((part) => part.type === 'day').value;

    return `${year}/${month}/${day}`;
  };
  const formattedDate = inputValue ? formatDate(inputValue) : '';

  const onAction = () => {
    setInputValue(selectedDate);
    onDateChange(convertTimeToISO(selectedDate), name);
    onModalToggle();
  };

  return (
    <>
      <div
        className={`datepicker-input input-contained ${styles}`}
        onClick={onModalToggle}
      >
        {formattedDate ? (
          <span className="custom-input-value">{formattedDate}</span>
        ) : (
          <span className="custom-input-placeholder">
            {t('general.datepicker_placeholder')}
          </span>
        )}

        <Calendar />
      </div>

      <Modal buttonRef={buttonRef} className="date-picker-modal">
        <div className="flex mb-5">
          <div ref={monthRef}>
            <button
              type="button"
              onClick={() => {
                setShowYears(false);
                setShowMonths(!showMonths);
              }}
            >
              <h4>
                {
                  months[
                    locale === locales.persian
                      ? moment(selectedDate).jMonth()
                      : selectedDate.getMonth()
                  ]
                }
              </h4>
            </button>

            {showMonths && (
              <div className="month-year-picker smooth-scroll">
                {months.map((month, index) => {
                  const isDisabled =
                    disableLastDays &&
                    (isShamsi
                      ? today.jMonth() > index
                      : today.getMonth() > index);

                  return (
                    <div
                      key={month}
                      className={`month-name body-2 ${
                        (
                          locale === locales.persian
                            ? index === moment(selectedDate).jMonth()
                            : index === selectedDate.getMonth()
                        )
                          ? 'date-picked'
                          : ''
                      }${isDisabled ? 'date-disabled' : ''}`}
                      onClick={isDisabled ? null : () => onMonthClick(index)}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div ref={yearRef} className="ms-2 me-1">
            <button
              type="button"
              onClick={() => {
                setShowMonths(false);
                setShowYears(!showYears);
              }}
            >
              <h4>
                {locale === locales.persian
                  ? moment(selectedDate).jYear()
                  : selectedDate.getFullYear()}
              </h4>
            </button>

            {showYears && (
              <div className="month-year-picker">
                {years.map((year) => {
                  const shamsiYear = moment().year(year).jYear();
                  const displayedYear =
                    locale === locales.persian ? shamsiYear : year;
                  const isDisabled =
                    disableLastDays &&
                    (isShamsi
                      ? today.jYear() > shamsiYear
                      : today.getFullYear() > year);

                  return (
                    <div
                      key={year}
                      className={`year-name ${
                        locale === locales.persian
                          ? displayedYear === moment(selectedDate).jYear()
                            ? 'date-picked'
                            : ''
                          : year === selectedDate.getFullYear()
                            ? 'date-picked'
                            : ''
                      }${isDisabled ? 'date-disabled' : ''}`}
                      onClick={isDisabled ? null : () => onYearClick(year)}
                    >
                      {displayedYear}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>
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
          <div className="calendar-days">{renderDays()}</div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="button"
            className="h-auto w-auto text-ultraviolet h7 uppercase"
            onClick={onAction}
          >
            <h5>{t('general.ok')}</h5>
          </button>
        </div>
      </Modal>
    </>
  );
}
