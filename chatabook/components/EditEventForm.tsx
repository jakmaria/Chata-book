import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { Event, User } from '@prisma/client';
import { useMutation } from '@apollo/client';
import { EventTileType } from './EventTile';
import { createDate } from '@/scripts/createDate';
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

const EDIT_EVENT_MUTATION = gql`
  mutation editMutation(
    $id: ID!
    $userId: Int!
    $occassion: String!
    $start: String!
    $end: String!
    $people: Int!
    $whole: Boolean!
    $appartments: Int!
    $message: String
  ) {
    editEvent(
      id: $id
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
        id
        people
      }
    }
  }
`;

export default function EditEventForm({
  eventInfo,
  // setEventInfo,
  setEdit,
  setAllEvents,
}: {
  eventInfo: EventWithUser;
  // setEventInfo: (value: EventTileType | ((prevVar: EventTileType) => EventTileType)) => void;
  setEdit: (value: SetStateAction<Boolean>) => void;
  setAllEvents: Dispatch<SetStateAction<EventWithUser[]>>;
}) {
  const { data, loading, error } = useQuery(AllNamesQuery);

  const [editFormState, setEditFormState] = useState({
    id: eventInfo.id,
    userId: eventInfo.userId,
    occassion: eventInfo.occassion,
    start: new Date(parseInt(eventInfo.start.toString())).toISOString().slice(0, 10),
    end: new Date(parseInt(eventInfo.end.toString())).toISOString().slice(0, 10),
    people: eventInfo.people,
    whole: eventInfo.whole,
    appartments: Number(eventInfo.appartments),
    message: eventInfo.message || '',
  });

  const [editEvent] = useMutation(EDIT_EVENT_MUTATION, {
    variables: {
      id: Number(editFormState.id),
      userId: editFormState.userId,
      occassion: editFormState.occassion,
      start: editFormState.start,
      end: editFormState.end,
      people: Number(editFormState.people),
      whole: editFormState.whole,
      appartments: editFormState.appartments,
      message: editFormState.message,
    },
  });

  useEffect(() => {
    console.log('magic', editFormState, typeof new Date(editFormState.start));
  }, [editFormState]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editEvent();
          setAllEvents((e) =>
            e.map((event) => {
              if (event.id == editFormState.id) {
                return {
                  ...event,
                  appartments: editFormState.appartments,
                  whole: editFormState.whole,
                  start: new Date(editFormState.start).getTime().toString(),
                  end: new Date(editFormState.end).getTime().toString(),
                  message: editFormState.message,
                  occassion: editFormState.occassion,
                  people: editFormState.people,
                  userId: editFormState.userId,
                };
              }
              return event;
            })
          );
          setEdit(false);
        }}
      >
        <div className="flex flex-col gap-3">
          <h3>Kto objednáva?</h3>
          <select
            className="font-bold"
            required
            value={editFormState.userId}
            onChange={(e) => {
              setEditFormState({
                ...editFormState,
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
              value={editFormState.occassion}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
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
              value={editFormState.start}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
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
              value={editFormState.end}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
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
              value={editFormState.people}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
                  people: Number(e.target.value),
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
                  ? setEditFormState({
                      ...editFormState,
                      whole: true,
                    })
                  : setEditFormState({
                      ...editFormState,
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
              value={editFormState.appartments}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
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
              value={editFormState.message}
              onChange={(e) => {
                setEditFormState({
                  ...editFormState,
                  message: e.target.value,
                });
              }}
            />
          </label>
        </div>
        <button className="border-solid border-[2px] rounded-md border-black mt-3" type="submit">
          Upravit udalost
        </button>
      </form>
    </div>
  );
}
