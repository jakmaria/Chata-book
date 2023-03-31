import CreateEventForm from '@/components/CreateEventForm';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import type { Event, PrismaClient, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import EventTile from '@/components/EventTile';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
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

const AllEventsQuery = gql`
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
  const { user, signUp } = useAuth();
  const [allEvents, setAllEvents] = useState<EventWithUser[]>([]);
  const { data, loading, error, networkStatus } = useQuery(AllEventsQuery, {
    onCompleted: (data) => setAllEvents(data.events),
    notifyOnNetworkStatusChange: true,
  });
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowForm(!showForm);
  };

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(allEvents);

  return (
    <>
      {user && <Header />}
      <div className="flex flex-col ">
        <button className="border-black rounded-md border-solid border-[3px]" onClick={handleClick}>
          Vytvorit udalost
        </button>
        {showForm && <CreateEventForm getUpdatedData={setAllEvents} showForm={setShowForm} />}
      </div>
      {allEvents &&
        allEvents.map((event: EventWithUser) => (
          <EventTile key={event.id} event={event} setAllEvents={setAllEvents} />
        ))}
      <button
        className="border-black rounded-md border-solid border-[3px]"
        onClick={() => router.push('/')}
      >
        Spat na domovsku stranku
      </button>
    </>
  );
}
