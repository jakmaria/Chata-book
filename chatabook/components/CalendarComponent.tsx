import { EventWithUser } from '@/pages/events';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sk';

type CalendarProps = {
  eventsdata: EventWithUser[];
};

moment.locale('sk');
const localizer = momentLocalizer(moment);

export default function CalendarComponent({ eventsdata }: CalendarProps) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        culture="sk"
        events={eventsdata}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) =>
          alert(
            `Je tu ${event.occassion}, usporiadateľ je ${event.user.name}. Bude tam ${event.people} ľudí. Počet využitých apartmánov: ${event.appartments}. ${event.message}`
          )
        }
        messages={{
          next: 'Nasledujúci',
          previous: 'Predchádzajúci',
          today: 'Aktuálny',
          month: 'Mesiac',
          week: 'Týždeň',
          day: 'Deň',
          agenda: 'Agenda',
          date: 'Dátum',
          time: 'Čas',
          event: 'Udalosť', // used in time grid view
          showMore: (total) => `+ Zobraziť viac (${total})`, // used in month view
        }}
      />
    </div>
  );
}
