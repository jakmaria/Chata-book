import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import type { Event, User } from '@prisma/client';
import { useMutation } from '@apollo/client';
import { EventWithUser } from '@/pages/events';

const AllNamesQuery = gql`
  query {
    users {
      name
      surname
      id
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation createMutation(
    $userId: Int!
    $occassion: String!
    $start: String!
    $end: String!
    $people: Int!
    $whole: Boolean!
    $appartments: Int!
    $message: String
  ) {
    createEvent(
      userId: $userId
      occassion: $occassion
      start: $start
      end: $end
      people: $people
      whole: $whole
      appartments: $appartments
      message: $message
    ) {
      event {
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
  }
`;

interface Fn {
  getUpdatedData: Function;
  showForm: Function;
}

export default function CreateEventForm(fn: Fn) {
  const { data, loading, error } = useQuery(AllNamesQuery);

  const [formState, setFormState] = useState({
    userId: 1,
    occassion: '',
    start: '',
    end: '',
    people: '',
    whole: true,
    appartments: 1,
    message: '',
  });

  const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
    variables: {
      userId: formState.userId,
      occassion: formState.occassion,
      start: formState.start,
      end: formState.end,
      people: Number(formState.people),
      whole: formState.whole,
      appartments: formState.appartments,
      message: formState.message,
    },
  });

  // useEffect(() => {
  //   console.log(formState, 'user id is undefined', formState.userId == undefined);
  // }, [formState]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await createEvent();
          const d: EventWithUser = data.data.createEvent.event;
          fn.getUpdatedData((prev: EventWithUser[]) => [...prev, d].sort((a, b) => b.id - a.id));
          fn.showForm(false);
        }}
      >
        <div className="flex flex-col gap-3">
          <h3>Kto objednáva?</h3>
          <select
            className="font-bold"
            required
            value={formState.userId}
            onChange={(e) => {
              setFormState({
                ...formState,
                userId: Number(e.target.value),
              });
            }}
          >
            {data.users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <label>
            Príležitost:
            <input
              required
              type="text"
              value={formState.occassion}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  occassion: e.target.value,
                });
              }}
            />
          </label>
          <label className="flex flex-col">
            Od:
            <input
              className="font-bold"
              required
              type="date"
              value={formState.start}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  start: e.target.value,
                });
              }}
            />
          </label>
          <label className="flex flex-col">
            Do:
            <input
              className="font-bold"
              required
              type="date"
              value={formState.end}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  end: e.target.value,
                });
              }}
            />
          </label>
          <label>
            Počet ludí:
            <input
              className="font-bold"
              required
              type="number"
              value={formState.people}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  people: e.target.value,
                });
              }}
            />
          </label>
          <label>
            Chceme mat celú chatu pre seba:
            <select
              className="font-bold"
              required
              onChange={(e) => {
                e.target.value == 'Áno'
                  ? setFormState({
                      ...formState,
                      whole: true,
                    })
                  : setFormState({
                      ...formState,
                      whole: false,
                    });
              }}
            >
              <option>{true} Áno</option>
              <option>{false} Nie</option>
            </select>
          </label>
          <label>
            Počet využitych apartmánov:
            <select
              className="font-bold"
              required
              value={formState.appartments}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  appartments: Number(e.target.value),
                });
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>
          <label className="flex flex-col">
            Extra info
            <textarea
              className="font-bold border-solid border-[2px] rounded-md border-black"
              placeholder="Ktoré apartmány využijete, čas odchodu, prípadne extra info k udalosti."
              value={formState.message}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  message: e.target.value,
                });
              }}
            />
          </label>
        </div>
        <button className="border-solid border-[2px] rounded-md border-black mt-3" type="submit">
          Vytvorit udalost
        </button>
      </form>
    </div>
  );
}
