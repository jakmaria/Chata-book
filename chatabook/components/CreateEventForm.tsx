import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import type { Event, User } from '@prisma/client';

const AllNamesQuery = gql`
  query {
    users {
      name
      surname
      id
    }
  }
`;

export default function CreateEventForm() {
  const { data, loading, error } = useQuery(AllNamesQuery);
  const [formState, setFormState] = useState({
    name: '',
    occassion: '',
    people: '',
    whole: '',
    start: '',
    end: '',
    appartments: '',
    message: '',
  });

  useEffect(()=>{
    console.log(formState)
  },[formState])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-column mt3">
          <select
            value={formState.name}
            onChange={(e) => {
              setFormState({
                ...formState,
                name: e.target.value,
              });
            }}
          >
            {data.users.map((user: User) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <input type="date" value={formState.start} onChange={(e) => {
              setFormState({
                ...formState,
                start: e.target.value,
              });
            }}/>
        </div>
        <button type="submit">Vytvorit udalost</button>
      </form>
    </div>
  );
}
