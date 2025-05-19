import FullCalendar from '@/app/ui/Calendar/FullCalendar';

export default function CalendarFull() {
  return (
    <>
      <div className="full-calendar-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>

      <FullCalendar />
    </>
  );
}
