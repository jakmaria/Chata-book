import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import type { Event, User } from '@prisma/client';
import { useMutation } from '@apollo/client';
import { EventTileType } from './EventTile';
import { createDate } from '@/scripts/createDate';
import { EventWithUser } from '@/pages/events';
import { useAuth } from '@/context/AuthContext';

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
    $email: String!
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
      email: $email
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
  const userData = useAuth();

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
      email: userData.userData.email,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <form
        className="flex flex-col mr-auto ml-auto bg-gray-200 min-w-[50vw] max-w-[60vw] max-md:min-w-[80vw] max-md:max-w-[90vw] text-gray-800 font-medium py-2 px-4 border border-gray-600 rounded-xl shadow font-ysabeau bg-opacity-70"
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
        <div className="flex flex-col gap-1 ">
          <h3>Kto objednáva?</h3>
          <select
            className="ont-light text-[#d4bc98] bg-[#1e2024] p-1 border-gray-800  rounded-xl"
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
              className="text-[#d4bc98] bg-[#1e2024] p-1 border-gray-800  rounded-xl ml-2"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] bg-opacity-50 p-1 border-gray-800  rounded-xl"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] bg-opacity-50 p-1 border-gray-800  rounded-xl"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-1 border-gray-800  rounded-xl ml-2"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-1 border-gray-800  rounded-xl ml-2"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-1 border-gray-800  rounded-xl ml-2"
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
              className="font-extralight text-base leading-9 border-[2px] rounded-xl border-black text-[#d4bc98] bg-[#1e2024] p-1 mt-1 min-h-[90px]"
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
        <button
          className=" bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-1 border border-[#d4bc98]  rounded-xl shadow-lg font-ysabeau font-extralight text-lg bg-opacity-90 mt-3  min-w-[50%] max-w-lg  "
          type="submit"
        >
          Upravit udalost
        </button>
      </form>
    </div>
  );
}
