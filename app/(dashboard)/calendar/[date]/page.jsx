import ThisWeek from '@/app/ui/Calendar/ThisWeek';
import { get_locale } from '@/utils/server-functions';
import { locales } from '@/utils/constants/enums';

export default async function CalendarWeekWithDate({ params }) {
  const { date } = await params;

  const isShamsi = (await get_locale())?.language === locales.persian;

  return (
    <ThisWeek defaultDate={decodeURIComponent(date)} isShamsi={isShamsi} />
  );
}
