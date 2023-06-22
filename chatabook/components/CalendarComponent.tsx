import { EventWithUser } from '@/pages/events';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type CalendarProps = {
  eventsdata: EventWithUser[];
};

const localizer = momentLocalizer(moment);

export default function CalendarComponent({ eventsdata }: CalendarProps) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventsdata}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 340, width: 600, backgroundColor: 'lightblue' }}
        onSelectEvent={(event) =>
          alert(`There is a ${event.occassion} by ${event.user.name}. ${event.message}`)
        }
      />
    </div>
  );
}
