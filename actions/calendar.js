import { fetch_api } from '@/app/api/base_fetch_client';
import {
  convertUTCToLocalTime,
  getDateMonthStartEnd,
  getLocalDateString,
  getWeekFirstDate,
  validateDate,
  validateText,
} from '@/utils/functions';
import { method } from '@/utils/constants/apis';
import { eventTypes } from '@/utils/constants/enums';

export async function getWeekEvents(date, isShamsi) {
  try {
    const monday = getWeekFirstDate(date, isShamsi);
    return await getEvents(monday.toISOString());
  } catch (error) {
    console.log('error getWeekEvents', error);

    return { data: {}, ok: false };
  }
}

export async function getMonthEvents(date, isShamsi) {
  try {
    const { firstDay, lastDay } = getDateMonthStartEnd(date, isShamsi);

    return await getEvents(
      getLocalDateString(firstDay),
      getLocalDateString(lastDay),
    );
  } catch (error) {
    console.log('error getMonthEvents', error);

    return { data: {}, ok: false };
  }
}

export async function getEvents(fromDate, toDate) {
  try {
    const { data, ok } = await fetch_api(
      `/api/calendar/events?from_date=${fromDate}${toDate ? `&to_date=${toDate}` : ''}`,
      method.get,
    );

    const tempData = {};

    if (ok) {
      for (let i = 0; i < data?.length; i += 1) {
        const item = data[i];
        const dateObject = new Date(item?.date);
        const localeDate = convertUTCToLocalTime(dateObject, true);
        const dateKey = localeDate?.getDate();
        const itemWithLocalDate = { ...item, localeDate };

        if (!tempData[dateKey]) {
          tempData[dateKey] = {};
        }
        if (item?.event_type === eventTypes.appointment) {
          if (tempData[dateKey]?.event) {
            tempData[dateKey].event.push(itemWithLocalDate);
          } else {
            tempData[dateKey].event = [itemWithLocalDate];
          }
        } else {
          if (tempData[dateKey]?.test) {
            tempData[dateKey].test.push(itemWithLocalDate);
          } else {
            tempData[dateKey].test = [itemWithLocalDate];
          }
        }
      }
    }

    return {
      data: tempData,
    };
  } catch (error) {
    console.log('error getEvents', error);

    return { data: {}, ok: false };
  }
}

export async function getSpecialDates() {
  try {
    return await fetch_api(`/api/calendar/pregnancy-dates`, method.get);
  } catch (error) {
    console.log('error getSpecialDates', error);

    return { data: {}, ok: false };
  }
}

export async function getEvent(id) {
  try {
    return await fetch_api(`/api/calendar/event?id=${id}`, method.get);
  } catch (error) {
    console.log('error getEvent', error);

    return { data: {}, ok: false };
  }
}

export async function addEvent(form, t, isEdit) {
  try {
    const { title, date } = form;
    if (!validateText(title)) {
      throw { title: t('error.required', { name: t('general.title') }) };
    }
    if (!validateDate(date)) {
      throw { date: t('error.required', { name: t('general.date') }) };
    }

    return await fetch_api(
      `/api/calendar/event`,
      isEdit ? method.patch : method.post,
      JSON.stringify(form),
    );
  } catch (error) {
    console.log('error addEvent', error);

    return {
      errors: error,
      ok: false,
    };
  }
}

export async function deleteEvent(id) {
  try {
    return await fetch_api(`/api/calendar/event?id=${id}`, method.delete);
  } catch (error) {
    console.log('error deleteEvent', error);

    return {
      errors: error,
      ok: false,
    };
  }
}

export async function addSymptom(form) {
  try {
    return await fetch_api(
      `/api/calendar/symptom`,
      method.post,
      JSON.stringify(form),
    );
  } catch (error) {
    console.log('error addSymptom', error);

    return {
      errors: error,
      ok: false,
    };
  }
}

export async function addMood(form) {
  try {
    return await fetch_api(
      `/api/calendar/mood`,
      method.post,
      JSON.stringify(form),
    );
  } catch (error) {
    console.log('error addMood', error);

    return {
      errors: error,
      ok: false,
    };
  }
}

export async function getMoodSymptom(defaultDate) {
  try {
    const localDateString =
      defaultDate.getFullYear() +
      '-' +
      String(defaultDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(defaultDate.getDate()).padStart(2, '0');

    return await fetch_api(
      `/api/calendar/mood?date=${localDateString}`,
      method.get,
    );
  } catch (error) {
    console.log('error getMoodSymptom', error);

    return { data: {}, ok: false };
  }
}
