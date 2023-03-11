import { gql, useQuery } from '@apollo/client';
import type { Event } from '@prisma/client';

const AllEventsQuery = gql`
  query {
    events {
      user {
        id
        name
        surname
      }
      occassion
    }
  }
`;

export default function Events() {
  const { data } = useQuery(AllEventsQuery);

  return (
    <>
      {data.events.map((event: Event) => (
        <>
          <h1>{event.occassion}</h1>
          <p>{event.people}</p>
          <p>We are using the whole place:{}</p>
        </>
      ))}
    </>
  );
}
