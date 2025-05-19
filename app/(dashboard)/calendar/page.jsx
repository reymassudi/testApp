import ThisWeek from '@/app/ui/Calendar/ThisWeek';
import { get_locale } from '@/utils/server-functions';
import { locales } from '@/utils/constants/enums';

export default async function CalendarWeek() {
  const isShamsi = (await get_locale())?.language === locales.persian;

  return <ThisWeek isShamsi={isShamsi} />;
}
