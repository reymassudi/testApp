'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/Modal';
import { getTimeOfDate } from '@/utils/functions';

export default function ModalTime({ date, onDateChange }) {
  const t = useTranslations();
  const buttonRef = useRef(null);
  const [form, setForm] = useState({
    hour: '',
    minute: '',
    afterMidday: false,
  });
  const [display, setDisplay] = useState({
    hour: '',
    minute: '',
    afterMidday: false,
  });

  const { hour, minute, afterMidday } = form;

  useEffect(() => {
    if (date instanceof Date && !isNaN(date)) {
      const initialTime = getTimeOfDate(date);
      setForm(initialTime);
      setDisplay(initialTime);
    }
  }, [date]);

  const onAction = () => {
    setTime();
  };

  const onModalToggle = () => {
    buttonRef?.current.click();
  };

  function setTime() {
    let newHour = parseInt(hour);
    if (afterMidday && newHour < 12) {
      newHour += 12;
    } else if (!afterMidday && newHour === 12) {
      newHour = 0;
    }

    let newMinute = parseInt(minute);

    const updatedDate = new Date(date);
    updatedDate.setHours(newHour);
    updatedDate.setMinutes(newMinute);
    updatedDate.setSeconds(0);
    updatedDate.setMilliseconds(0);

    onDateChange(updatedDate);
    setDisplay({
      afterMidday,
      minute,
      hour,
    });
    onModalToggle();
  }

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const checkInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let newValue = value;

    if (name === 'minute') {
      newValue = parseInt(value);
      if (newValue > 59) {
        newValue = '59';
      }
    } else if (name === 'hour') {
      newValue = parseInt(value);
      if (newValue > 11) {
        newValue = '11';
      }
    }
    newValue = newValue.toString().padStart(2, '0');
    setForm({ ...form, [name]: newValue });
  };

  const onMidnightChange = (value) => {
    setForm({ ...form, afterMidday: value });
  };

  return (
    <>
      <div
        className="input-contained event-time-input text-gray-700 body-2 mt-2"
        onClick={onModalToggle}
      >
        {display?.hour && (
          <>
            <span>
              {display?.hour}:{display?.minute}
            </span>
            <span className="ms-3 uppercase inline-block">
              {display?.afterMidday
                ? t('calendar.midday_after')
                : t('calendar.midday_before')}
            </span>
          </>
        )}
      </div>

      <Modal buttonRef={buttonRef} className="time-modal">
        <h4 className="mb-7">{t('calendar.enter_time')}</h4>

        <div className="px-4 time-input">
          <div>
            <input
              type="text"
              maxLength="2"
              inputMode="numeric"
              className="input-contained"
              value={hour}
              name="hour"
              onChange={onInputChange}
              onBlur={checkInput}
            />
            <span className="capitalize h10 text-gray-700 mt-2">
              {t('calendar.hour')}
            </span>
          </div>

          <span className="time-dot">:</span>

          <div className="me-3">
            <input
              type="text"
              maxLength="2"
              inputMode="numeric"
              className="input-contained"
              value={minute}
              name="minute"
              onChange={onInputChange}
              onBlur={checkInput}
            />
            <span className="capitalize h10 text-gray-700 mt-2">
              {t('calendar.minute')}
            </span>
          </div>

          <div>
            <div className="midday-time mb-11">
              <h6
                className={`midday-name${!afterMidday ? ' selected' : ''}`}
                onClick={() => onMidnightChange(false)}
              >
                {t('calendar.midday_before')}
              </h6>
              <h6
                className={`midday-name${afterMidday ? ' selected' : ''}`}
                onClick={() => onMidnightChange(true)}
              >
                {t('calendar.midday_after')}
              </h6>
            </div>
            <div className="flex justify-end">
              <button
                className="h-auto w-auto text-ultraviolet h7 uppercase"
                onClick={onAction}
              >
                {t('general.ok')}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
