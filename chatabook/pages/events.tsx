import CreateEventForm from '@/components/CreateEventForm';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import type { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import EventTile from '@/components/EventTile';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { getAuth } from 'firebase/auth';
import CalendarComponent from '@/components/CalendarComponent';
import { useAuth } from '@/context/AuthContext';

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
  const { data, loading, error, networkStatus, refetch } = useQuery(AllEventsQuery, {
    notifyOnNetworkStatusChange: true,
  });
  const userData = useAuth();

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

  console.log('allEvents', allEvents);

  return (
    <>
      {userData.userData.roleId > 1 ? (
        <div className="bg-view bg-cover bg-scroll min-h-[100vh]  h-[100%] flex flex-col gap-6">
          <div className="ml-auto mr-auto"> {user && <Header />}</div>
          <CalendarComponent eventsdata={calendarEvents} />
          <div className="flex flex-col gap-3 justify-content-center ml-auto mr-auto">
            {userData.userData.roleId > 2 && (
              <button
                className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-extralight text-lg bg-opacity-90 "
                onClick={handleClick}
              >
                Vytvoriť udalost
              </button>
            )}
            {showForm && <CreateEventForm getUpdatedData={setAllEvents} showForm={setShowForm} />}
            <button
              className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-extralight text-lg bg-opacity-90 mt-2 "
              onClick={() => setShowEvents(!showEvents)}
            >
              {showEvents ? 'Skryť' : 'Zobraziť'} udalosti
            </button>
          </div>
          {showEvents &&
            allEvents &&
            allEvents.map((event: EventWithUser) => (
              <EventTile key={event.id} event={event} setAllEvents={setAllEvents} />
            ))}
          <button
            className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-4 border border-[#d4bc98] hover:border-[#1e2024] rounded-xl shadow font-ysabeau font-extralight text-lg  ml-auto mr-auto mb-4"
            onClick={() => router.push('/')}
          >
            Späť na domovskú stránku
          </button>
        </div>
      ) : (
        <div className="bg-view bg-cover bg-scroll flex flex-col justify-start items-center h-screen w-screen">
          <h2 className="mt-10 p-4 bg-white opacity-80 border border-gray-400 rounded-xl  text-gray-800 font-ysabeau font-extralight text-lg mb-5">
            K udalostiam nemáš prístup, skús požiadať admina, aby ti ho udelil.
          </h2>

          <button
            className="bg-white hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 rounded-xl shadow font-ysabeau font-extralight text-lg  max-w-md bg-opacity-90"
            onClick={() => router.push('/')}
          >
            Späť na domovskú stránku
          </button>
        </div>
      )}
    </>
  );
}
