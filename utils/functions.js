import { format, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { email_regex, phone_regex } from '@/utils/constants/regexes';
import { pregnancy_total_weeks } from '@/utils/constants';
import { locales } from '@/utils/constants/enums';
import moment from 'moment-jalaali';

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const ensureUtcIso = (isoTime) => {
  return isoTime.endsWith('Z') ? isoTime : isoTime + 'Z';
};
export const convertIsoToLocalTime = (isoTime, getObject) => {
  try {
    const safeIsoTime = ensureUtcIso(isoTime);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = toZonedTime(safeIsoTime, userTimeZone);

    if (getObject) {
      return localDate;
    }

    return format(localDate, 'HH:mm');
  } catch (e) {
    console.error('Time conversion error:', e);
    return '';
  }
};

export const convertUTCToLocalTime = (utcTime, getObject) => {
  try {
    const utcTimeZone = 'UTC'; // Use UTC as the base
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = fromZonedTime(utcTime, utcTimeZone);

    const localDate = toZonedTime(utcDate, userTimeZone);
    if (getObject) {
      return localDate;
    }

    return format(localDate, 'HH:mm');
  } catch (e) {
    return '';
  }
};

export function convertTimeToISO(dateString) {
  if (dateString) {
    const dateObject = new Date(dateString);
    const adjustedDate = new Date(
      dateObject.getTime() - dateObject.getTimezoneOffset() * 60000,
    );
    return adjustedDate.toISOString();
  }
  return null;
}

export const validateText = (text) => {
  return !(!text || !text.length);
};
export const validatePhone = (text) => {
  return phone_regex.test(text);
};
export const validateEmail = (text) => {
  return email_regex.test(text);
};
export const validateDate = (text) => {
  return text instanceof Date && !isNaN(text);
};

function numberToWords(num) {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens = [
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  let words = '';

  if (num < 10) {
    words = ones[num];
  } else if (num > 10 && num < 20) {
    words = teens[num - 11];
  } else if (num % 10 === 0) {
    words = tens[Math.floor(num / 10)];
  } else {
    words = tens[Math.floor(num / 10)] + '-' + ones[num % 10];
  }

  if (num === 10) words = 'ten';
  return words;
}
function numberToPersianWords(num) {
  const numbers = {
    1: 'یک',
    2: 'دو',
    3: 'سه',
    4: 'چهار',
    5: 'پنج',
    6: 'شش',
    7: 'هفت',
    8: 'هشت',
    9: 'نه',
    10: 'ده',
    11: 'یازده',
    12: 'دوازده',
    13: 'سیزده',
    14: 'چهارده',
    15: 'پانزده',
    16: 'شانزده',
    17: 'هفده',
    18: 'هجده',
    19: 'نوزده',
    20: 'بیست',
    30: 'سی',
    40: 'چهل',
    50: 'پنجاه',
    60: 'شصت',
    70: 'هفتاد',
    80: 'هشتاد',
    90: 'نود',
    100: 'صد',
  };

  return numbers[num];
}
export function ordinalNumberToWords(num, locale) {
  if (locale === locales.persian) {
    const ordinals = {
      1: 'اول',
      3: 'سوم',
      30: 'سی‌ام',
    };

    if (ordinals[num]) {
      return ordinals[num];
    }
    const ntpw = numberToPersianWords(num);
    if (ntpw) {
      return `${ntpw}م`;
    }

    let remainder = num % 10;
    let base = Math.floor(num / 10) * 10;
    let baseWord = numberToPersianWords(base);

    // Combine base and remainder correctly
    if (remainder > 0) {
      let suffix =
        remainder === 3 ? ordinals[3] : `${numberToPersianWords(remainder)}م`;
      return `${baseWord} و ${suffix}`;
    }

    return baseWord;
  }

  const ordinals = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth',
    5: 'fifth',
    6: 'sixth',
    7: 'seventh',
    8: 'eighth',
    9: 'ninth',
    10: 'tenth',
    11: 'eleventh',
    12: 'twelfth',
    13: 'thirteenth',
    14: 'fourteenth',
    15: 'fifteenth',
    16: 'sixteenth',
    17: 'seventeenth',
    18: 'eighteenth',
    19: 'nineteenth',
    20: 'twentieth',
    30: 'thirtieth',
    40: 'fortieth',
    50: 'fiftieth',
    60: 'sixtieth',
    70: 'seventieth',
    80: 'eightieth',
    90: 'ninetieth',
  };

  if (num <= 20 || num % 10 === 0) {
    return ordinals[num] || '';
  }

  let remainder = num % 10;
  let base = Math.floor(num / 10) * 10;

  let baseWord = numberToWords(base);
  let suffix =
    remainder > 0 ? ordinals[remainder] || `${numberToWords(remainder)}th` : '';
  return suffix === '' ? `${baseWord}th` : `${baseWord}-${suffix}`;
}

export function getOrdinal(num, locale) {
  if (locale === locales.persian) {
    return ` ی ${num}`;
  }

  // Handle special cases for numbers ending in 11, 12, or 13
  if (num % 100 >= 11 && num % 100 <= 13) {
    return num + 'th';
  }

  // Determine the ordinal suffix based on the last digit
  switch (num % 10) {
    case 1:
      return num + 'st';
    case 2:
      return num + 'nd';
    case 3:
      return num + 'rd';
    default:
      return num + 'th';
  }
}

export function getPregnancyWeek(currentDates) {
  if (currentDates) {
    return Math.ceil(currentDates / 7);
  }
  return null;
}
export function getPregnancyWeekDates(currentDates) {
  if (currentDates) {
    let weekNum = Math.floor(currentDates / 7);
    if (currentDates % 7 !== 0) {
      weekNum++;
    }
    return weekNum * 7;
  }
  return null;
}
export function getPregnancyDateLeft(currentDates) {
  const totalDates = pregnancy_total_weeks * 7;
  return totalDates - currentDates;
}
export function getPregnancyTrimester(currentDates) {
  const totalDates = pregnancy_total_weeks * 7;
  const trimesterDays = Math.floor(totalDates / 3);

  if (currentDates > trimesterDays * 2) {
    return '3rd';
  }
  if (currentDates > trimesterDays) {
    return '2nd';
  }
  return '1st';
}

export function getIsRTL(locale, localesList) {
  const lang = localesList?.length
    ? localesList?.find((item) => item.language === locale)
    : null;
  return lang?.rtl;
}

export async function get_baby_genders(t) {
  return [
    { label: t('statics.genders.girl'), value: 'Girl' },
    { label: t('statics.genders.boy'), value: 'Boy' },
    { label: t('statics.genders.twin'), value: 'Twin' },
    { label: t('statics.genders.unknown_gender'), value: 'DontKnow' },
  ];
}

export function get_pregnancy_week(locale, t) {
  const total_weeks = pregnancy_total_weeks;
  const weeks = [];
  for (let i = 0; i < total_weeks; i++) {
    weeks.push({
      label: t('pregnancy.week_number', {
        num: getOrdinal(i + 1, locale),
      }),
      value: (i + 1) * 7,
    });
  }

  return weeks;
}

export function getTimeOfDate(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12;
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  // Pad minutes/hours with leading zero if needed
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedHours = hours.toString().padStart(2, '0');

  return {
    afterMidday: ampm,
    minute: paddedMinutes,
    hour: paddedHours,
  };
}

export function getWeekFirstDate(date, isShamsi) {
  if (isShamsi) {
    // If it's not Saturday (day 6 in moment-jalaali), go back to Saturday
    const dayOfWeek = date.day(); // In moment, Saturday = 6 (Jalali uses 6 for Saturday)
    const daysToSubtract = dayOfWeek === 6 ? 0 : (dayOfWeek + 1) % 7;

    return date.subtract(daysToSubtract, 'days').startOf('day').toDate();
  }

  // Adjust so Monday is the first day of the week
  const day = date.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  return monday;
}

export function isDatesSameDay(date1, date2, isShamsi) {
  if (isShamsi) {
    return (
      date1.jYear() === date2.jYear() &&
      date1.jMonth() === date2.jMonth() &&
      date1.jDate() === date2.jDate()
    );
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export function isDatesAfterToday(date1, date2, isShamsi) {
  if (isShamsi) {
    return (
      date1.jYear() > date2.jYear() ||
      (date1.jYear() === date2.jYear() && date1.jMonth() > date2.jMonth()) ||
      (date1.jYear() === date2.jYear() &&
        date1.jMonth() === date2.jMonth() &&
        date1.jDate() > date2.jDate())
    );
  }

  return (
    date1.getFullYear() > date2.getFullYear() ||
    (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() > date2.getMonth()) ||
    (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() > date2.getDate())
  );
}

export function getDateMonthStartEnd(date, isShamsi) {
  if (isShamsi) {
    const shamsiDate = moment(date);
    const firstDay = shamsiDate.clone().jDate(1).startOf('day').toDate();
    const lastDay = shamsiDate
      .clone()
      .add(1, 'jMonth')
      .jDate(0)
      .startOf('day')
      .toDate();

    return { firstDay, lastDay };
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { firstDay, lastDay };
}

export function getLocalDateString(date) {
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}

export function shamsiToUtcDay(jYear, jMonth, jDay) {
  const m = moment(`${jYear}/${jMonth + 1}/${jDay}`, 'jYYYY/jM/jD');
  return m.date();
}

export function normalizePhoneNumber(number) {
  return number.slice(1);
}
