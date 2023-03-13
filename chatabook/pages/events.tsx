import CreateEventForm from '@/components/CreateEventForm';
import { yesOrNo } from '@/scripts/yesOrNo';
import { gql, useQuery } from '@apollo/client';
import type { Event } from '@prisma/client';
import parseJSON from 'date-fns/esm/parseJSON';
import { useState } from 'react';
import { createDate } from '../scripts/createDate';

const AllEventsQuery = gql`
  query {
    events {
      user {
        id
        name
        surname
      }
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
  const { data, loading, error } = useQuery(AllEventsQuery);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log(data);

  return (
    <>
      <div>
        <button onClick={handleClick}>Vytvorit udalost</button>
        {showForm && <CreateEventForm />}
      </div>
      {data.events.map((event: Event) => (
        <>
          <div key={event.id}>
            <h1>Kto objednal chatu? {event.user.name}</h1>
            <h1>Udalosť: {event.occassion}</h1>
            <p>Počet ľudí: {event.people}</p>
            <p>Chceme celú chatu: {yesOrNo(event.whole)}</p>
            <p>Začíname</p>
            <p>{createDate(event.start)}</p>
            <p>Končíme</p>
            <p>{createDate(event.end)}</p>
            {event.appartments ? (
              <p>Počet apartmánov, ktorý budeme potrebovať: {event.appartments}</p>
            ) : null}
            {event.message ? <p>{event.message}</p> : null}
          </div>
        </>
      ))}
    </>
  );
}
