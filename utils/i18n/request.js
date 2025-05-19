import { getRequestConfig } from 'next-intl/server';
import { get_locale } from '@/utils/server-functions';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  const localeObj = await get_locale();
  const locale = localeObj?.language;

  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
