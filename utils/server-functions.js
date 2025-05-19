'use server';

import { cookies } from 'next/headers';
import { cookie_names } from '@/utils/constants/enums';
import { default_locale } from '@/utils/constants';

export async function get_locale() {
  let locale;

  try {
    const localeString = (await cookies()).get(cookie_names.locale)?.value;
    locale = JSON.parse(localeString);
  } catch (error) {
    // console.log('error locale', error);
  }

  return locale ? locale : default_locale;
}
