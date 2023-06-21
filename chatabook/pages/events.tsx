import CreateEventForm from '@/components/CreateEventForm';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import type { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import EventTile from '@/components/EventTile';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { getAuth } from 'firebase/auth';
import CalendarComponent from '@/components/CalendarComponent';

type Modify<T, R> = Omit<T, keyof R> & R;

export type EventWithUser = Modify<
  Prisma.EventGetPayload<{
    include: {
      user: true;
    };
  }>,
  { start: string; end: string }
>;

//  {start:string, end: string}

export const AllEventsQuery = gql`
  query {
    events {
      user {
        name
      }
      id
      userId
      occassion
      people
      whole
      start
      end
      appartments
      message
    }
  }
`;

export default function Events() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [allEvents, setAllEvents] = useState<EventWithUser[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<EventWithUser[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const { data, loading, error, networkStatus } = useQuery(AllEventsQuery, {
    notifyOnNetworkStatusChange: true,
  });

  data && console.log(data);
  useEffect(() => {
    if (data) {
      const events = data.events.map((event: EventWithUser) => {
        return {
          ...event,
          start: event.start.toString(),
          end: event.end.toString(),
        };
      });
      setAllEvents(events);

      const calEvents = data.events.map((e: EventWithUser) => {
        return {
          ...e,
          start: new Date(Number(e.start)),
          end: new Date(Number(e.end)),
          title: e.occassion,
        };
      });
      setCalendarEvents(calEvents);
    }
  }, [data]);

  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowForm(!showForm);
  };

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="bg-view bg-cover bg-scroll h-screen flex flex-col ">
        <div className="ml-auto mr-auto"> {user && <Header />}</div>
        <CalendarComponent eventsdata={calendarEvents} />
        <div className="flex flex-col justify-content-center">
          <button
            className="border-black rounded-md border-solid border-[3px]  bg-white max-w-md"
            onClick={handleClick}
          >
            Vytvorit udalost
          </button>
          {showForm && <CreateEventForm getUpdatedData={setAllEvents} showForm={setShowForm} />}
          <button
            className="border-black rounded-md border-solid border-[3px] bg-white max-w-md"
            onClick={() => setShowEvents(!showEvents)}
          >
            {showEvents ? 'Hide' : 'Show'} Events
          </button>
        </div>
        {showEvents &&
          allEvents &&
          allEvents.map((event: EventWithUser) => (
            <EventTile key={event.id} event={event} setAllEvents={setAllEvents} />
          ))}
        <button
          className="border-black rounded-md border-solid border-[3px] bg-white max-w-md"
          onClick={() => router.push('/')}
        >
          Spat na domovsku stranku
        </button>
      </div>
    </>
  );
}
