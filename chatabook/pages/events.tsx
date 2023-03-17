import CreateEventForm from '@/components/CreateEventForm';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import type { Event, PrismaClient, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import EventTile from '@/components/EventTile';

export type EventWithUser = Prisma.EventGetPayload<{
  include: {
    user: true;
  };
}>;

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
  const [allEvents, setAllEvents] = useState<EventWithUser[] | null>(null);
  const { data, loading, error, networkStatus } = useQuery(AllEventsQuery, {
    onCompleted: (data) => setAllEvents(data.events),
    notifyOnNetworkStatusChange: true,
  });
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log(allEvents);

  return (
    <>
      <div className="flex flex-col ">
        <button className="border-black rounded-md border-solid border-[3px]" onClick={handleClick}>
          Vytvorit udalost
        </button>
        {showForm && <CreateEventForm getUpdatedData={setAllEvents} showForm={setShowForm} />}
      </div>
      {allEvents &&
        allEvents.map((event: EventWithUser) => (
          <EventTile
            id={event.id}
            key={event.id}
            userId={event.userId}
            name={event.user.name}
            occassion={event.occassion}
            start={event.start}
            end={event.end}
            message={event.message}
            people={event.people}
            appartments={event.appartments}
            whole={event.whole}
          />
        ))}
    </>
  );
}
