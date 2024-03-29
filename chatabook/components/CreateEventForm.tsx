import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import type { User } from '@prisma/client';
import { useMutation } from '@apollo/client';
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

export interface Fn {
  getUpdatedData: Function;
  showForm: Function;
}

export default function CreateEventForm(fn: Fn) {
  const { data, loading, error } = useQuery(AllNamesQuery);
  const userData = useAuth();

  const [formState, setFormState] = useState({
    userId: userData.userData.id,
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
      userId: Number(formState.userId),
      occassion: formState.occassion,
      start: formState.start,
      end: formState.end,
      people: Number(formState.people),
      whole: formState.whole,
      appartments: formState.appartments,
      message: formState.message,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <form
        className="bg-gray-200 min-w-[50vw] max-w-[60vw] max-md:min-w-[80vw] max-md:max-w-[90vw] text-gray-800 font-medium py-2 px-4 border border-gray-600 rounded-xl shadow font-ysabeau bg-opacity-70"
        onSubmit={async (e) => {
          e.preventDefault();

          // Parse dates
          const startDate = new Date(formState.start);
          const endDate = new Date(formState.end);
          const now = new Date();

          // Remove time part of the dates
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);

          // Check if the start date is in the past
          if (startDate < now) {
            alert('Start date cannot be in the past.');
            return;
          }

          // Check if the end date is before the start date
          if (endDate < startDate) {
            alert('End date cannot be before the start date.');
            return;
          }

          const data = await createEvent();

          if (data && data.data && data.data.createEvent.event !== null) {
            const newEventData: EventWithUser = data.data.createEvent.event;
            fn.getUpdatedData((prev: EventWithUser[]) =>
              [...prev, newEventData].sort((a, b) => b.id - a.id)
            );
            fn.showForm(false);
          } else {
            console.error('Mutation returned null or undefined');
          }
        }}
      >
        <div className="flex flex-col gap-3">
          <h3>Kto objednáva?</h3>

          <select
            className="font-light text-[#d4bc98] bg-[#1e2024] p-2 border-gray-800  rounded-xl"
            required
            value={formState.userId}
            onChange={(e) => {
              setFormState({
                ...formState,
                userId: Number(e.target.value),
              });
            }}
          >
            <option key={userData.userData.id} value={userData.userData.id}>
              {userData.userData.name}
            </option>
          </select>
          <label>
            Príležitost:
            <input
              className="text-[#d4bc98] bg-[#1e2024] p-2 border-gray-800  rounded-xl ml-2"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] bg-opacity-50 p-2 border-gray-800  rounded-xl"
              required
              type="date"
              value={formState.start}
              onChange={(e) => {
                setFormState((prevState) => {
                  // If the new start date is after the end date, reset the end date
                  const newStartDate = e.target.value;
                  let endDate = prevState.end;
                  if (newStartDate >= endDate) {
                    endDate = '';
                  }

                  return {
                    ...prevState,
                    start: newStartDate,
                    end: endDate,
                  };
                });
              }}
            />
          </label>
          <label className="flex flex-col">
            Do:
            <input
              className="font-light text-[#d4bc98] bg-[#1e2024] bg-opacity-50 p-2 border-gray-800  rounded-xl"
              required
              type="date"
              min={formState.start}
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-2 border-gray-800  rounded-xl ml-2"
              required
              type="number"
              min={1}
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-2 border-gray-800  rounded-xl ml-2"
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
              className="font-light text-[#d4bc98] bg-[#1e2024] p-2 border-gray-800  rounded-xl ml-2"
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
              className="font-extralight text-base leading-9 border-[2px] rounded-xl border-black text-[#d4bc98] bg-[#1e2024] p-2 mt-1 min-h-[90px]"
              placeholder="Ktoré apartmány využijete, čas príchodu/odchodu, prípadne extra info k udalosti."
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
        <button
          className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-2 px-1 border border-[#d4bc98]  rounded-xl shadow-lg font-ysabeau font-extralight text-lg bg-opacity-90 mt-3  min-w-[50%] max-w-lg "
          type="submit"
        >
          Vytvoriť udalost
        </button>
      </form>
    </div>
  );
}
