'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputContained, InputSelect, InputSwitch } from '@/components/Input';
import DatePicker from '@/components/Datepicker';
import Timepicker from '@/components/Timepicker';
import { addEvent, deleteEvent, getEvent } from '@/actions/calendar';
import { convertUTCToLocalTime } from '@/utils/functions';

import { urls } from '@/utils/constants/navigation';
import { eventTypes, searchQueries } from '@/utils/constants/enums';
import './calendar.scss';

export default function AddEvent() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    title: '',
    date: '',
    description: '',
    event_type: eventTypes.appointment,
    remind_before: '1 day',
    notification: true,
  });
  const { title, date, description, event_type, remind_before, notification } =
    form;

  const reminderOptions = [
    { label: t('statics.reminder.one_Day'), value: '1 day' },
    { label: t('statics.reminder.two_Day'), value: '2 days' },
    { label: t('statics.reminder.every_Day'), value: 'every day' },
  ];

  useEffect(() => {
    initEvent();
  }, [searchParams]);

  const initEvent = async () => {
    const eventDate = searchParams.get(searchQueries.eventDate);
    const eventType = searchParams.get(searchQueries.eventType);
    const eventId = searchParams.get(searchQueries.eventId);
    let newForm = { ...form };

    if (eventId) {
      const { data, ok } = await getEvent(eventId);
      if (ok) {
        const newDate = new Date(data.date);
        const localDate = convertUTCToLocalTime(newDate, true);
        newForm = { ...newForm, ...data, date: localDate };
        setIsEdit(true);
      } else {
        newForm.date = new Date();
      }
    } else {
      let defaultDate = new Date();
      let defaultType = eventTypes.appointment;

      if (eventDate || eventType) {
        defaultDate = new Date(eventDate);
        if (eventType === eventTypes.test) {
          defaultType = eventTypes.test;
        }
      }
      newForm.date = defaultDate;
      newForm.event_type = defaultType;
    }

    setPageLoading(false);
    setForm(newForm);
  };

  const onInputChange = (value, name) => {
    setError({ ...error, [name]: null });
    setForm({ ...form, [name]: value });
  };
  const onDateChange = (value) => {
    const newDate = new Date(value);
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    setForm({ ...form, date: newDate });
  };

  const onAddEvent = async () => {
    setLoading(true);
    const { errors, ok } = await addEvent(form, t, isEdit);
    if (ok) {
      router.push(`${urls.calendar}/${date.toISOString()}`);
    } else {
      setLoading(false);
      setError(errors);
    }
  };

  const onDeleteEvent = async () => {
    setLoading(true);
    const { ok, data } = await deleteEvent(form?.id);

    if (ok) {
      router.push(`${urls.calendar}/${date.toISOString()}`);
    }
  };

  return (
    <div className="add-event pb-10">
      {pageLoading ? null : (
        <>
          <div className="flex justify-between items-center w-full mt-6 px-4">
            <h4>
              {t(isEdit ? 'general.edit' : 'general.add', {
                var: t('calendar.event'),
              })}
            </h4>

            {isEdit && (
              <button
                className="text-ultraviolet h9 w-auto h-auto"
                onClick={onDeleteEvent}
              >
                {t('general.delete')}
              </button>
            )}
          </div>

          <div className="mt-8 px-6">
            <p className="mb-2 h7">{t('calendar.event_type')}</p>

            <div className="flex gap-3 mb-3">
              <div
                className={`tag-small${event_type === eventTypes.appointment ? ' selected' : ''}`}
                onClick={() =>
                  onInputChange(eventTypes.appointment, 'event_type')
                }
              >
                {t('statics.event_types.doctor_appointment')}
              </div>
              <div
                className={`tag-small${event_type === eventTypes.test ? ' selected' : ''}`}
                onClick={() => onInputChange(eventTypes.test, 'event_type')}
              >
                {t('statics.event_types.pregnancy_test')}
              </div>
            </div>

            <div className="ps-1 mb-4">
              <InputContained
                name="title"
                value={title}
                label={t('general.title')}
                onInputChange={onInputChange}
                className="event-input mb-4"
                error={error?.title}
              />

              <InputContained
                name="description"
                value={description}
                label={t('general.description')}
                onInputChange={onInputChange}
                className="event-input"
              />
            </div>

            <p className="mb-4 h7 capitalize">{t('calendar.reminder')}</p>

            <div className="flex gap-4 mb-4">
              <span className="text-gray-600">{t('general.notification')}</span>
              <InputSwitch
                name="notification"
                value={notification}
                onInputChange={onInputChange}
              />
            </div>

            <div className="ps-1">
              <label className="h7 text-gray-300 mb-2 block">
                {t('calendar.set_date_time')}
              </label>
              <DatePicker
                type="modal"
                styles={error?.date ? 'input-error' : ''}
                value={date}
                onDateChange={onDateChange}
                disableLastDays
              />

              <Timepicker
                date={date}
                onDateChange={(value) => onInputChange(value, 'date')}
              />

              <label className="h7 text-gray-300 mb-2 mt-3 block capitalize">
                {t('calendar.remind')}
              </label>
              <InputSelect
                name="remind_before"
                contained
                styles="reminder-select"
                options={reminderOptions}
                defaultValue={remind_before}
                onInputChange={onInputChange}
                disabled={!notification}
              />
            </div>

            <div className="flex w-full justify-center mt-10">
              <button
                className="button-ultraviolet"
                onClick={onAddEvent}
                disabled={loading}
              >
                {isEdit
                  ? t('general.save_changes')
                  : t('calendar.add_to_calendar')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
