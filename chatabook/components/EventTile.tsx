import { yesOrNo } from '@/scripts/yesOrNo';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { createDate } from '../scripts/createDate';
import EditEventForm from './EditEventForm';
import gql from 'graphql-tag';
import { EventWithUser } from '@/pages/events';
import { useAuth } from '@/context/AuthContext';

export type EventTileType = {
  id: number;
  name: string;
  userId: number;
  occassion: string;
  start: Date;
  end: Date;
  message?: string | null;
  people: number;
  appartments?: number;
  whole: boolean;
};

const DELETE_EVENT_MUTATION = gql`
  mutation deleteMutation($id: ID!, $email: String!) {
    deleteEvent(id: $id, email: $email) {
      id
    }
  }
`;

export default function EventTile({
  event,
  setAllEvents,
}: {
  event: EventWithUser;
  setAllEvents: Dispatch<SetStateAction<EventWithUser[]>>;
}) {
  const [edit, setEdit] = useState<Boolean>(false);
  const userData = useAuth();

  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      id: event.id,
      email: userData.user.email,
    },
    onCompleted: () => {
      setAllEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
    },
  });

  return (
    <>
      {!edit ? (
        <div className=" py-4 max-md:py-3 px-6 max-md:px-4 border border-gray-600 rounded-xl shadow font-ysabeau font-normal text-lg max-md:text-base mt-1 max-md:mt-0 mb-2 max-md:mb-0 mr-auto ml-auto flex flex-col bg-[#939791] min-w-[50vw] max-w-[55vw] max-md:min-w-[90vw] bg-opacity-80 ">
          <h1 className=" shadow-md py-2 px-3 bg-[#1e2024] bg-opacity-90 rounded-md text-xl max-md:text-lg text-[#939791] text-center">
            Zodpovedná osoba:{' '}
            <span className="text-[#d4bc98] ml-1 font-medium">{event.user.name}</span>
          </h1>
          <h1 className="shadow-md text-[#1e2024]  py-2 px-3 bg-[#d4bc98] bg-opacity-90 rounded-md mb-1 font-medium text-center">
            Udalosť: <span className="text-[#1e2024] ml-1 ">{event.occassion}</span>
          </h1>
          <div className="text-base mt-2 bg-[#1e2024] bg-opacity-90 rounded-md px-3 py-3 font-medium leading-9 text-[#939791]">
            {' '}
            <p className="border-b-2  border-[#d4bc98] border-opacity-30 py-1">
              Počet ľudí: <span className="text-[#d4bc98] ml-1">{event.people}</span>
            </p>
            <p className="border-b-2  border-[#d4bc98] border-opacity-30 py-1">
              Celá chata/súkromie:{' '}
              <span className="text-[#d4bc98] ml-1">{yesOrNo(event.whole)}</span>
            </p>
            <p className="border-b-2  border-[#d4bc98] border-opacity-30 py-1">
              Od: <span className="text-[#d4bc98] ml-1">{createDate(event.start)}</span>
            </p>
            <p className="border-b-2  border-[#d4bc98] border-opacity-30 py-1">
              Do: <span className="text-[#d4bc98] ml-1">{createDate(event.end)}</span>
            </p>
            <p className="border-b-2  border-[#d4bc98] border-opacity-30 py-1">
              Počet apartmánov: <span className="text-[#d4bc98] ml-1">{event.appartments}</span>
            </p>
          </div>

          {event.message ? (
            <p className="mt-3 text-[#2c320e] font-medium shadow-lg p-1  bg-[#d4bc98] bg-opacity-60 rounded-md text-base">
              {event.message}
            </p>
          ) : null}
          {event.userId === Number(userData?.userData?.id) && (
            <>
              <button
                onClick={() => setEdit(true)}
                className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-1 px-1 border border-[#d4bc98]  rounded-xl shadow-lg font-ysabeau text-lg bg-opacity-90 mt-3  min-w-[50%] max-w-lg ml-auto mr-auto"
              >
                Upraviť
              </button>
              <button
                onClick={() => deleteEvent()}
                className="bg-[#1e2024] hover:bg-[#d4bc98] hover:bg-opacity-80 hover:text-[#1e2024] text-[#d4bc98]  py-1 px-1 border border-[#d4bc98]  rounded-xl shadow-lg font-ysabeau text-lg bg-opacity-90 mt-1 min-w-[50%] max-w-lg ml-auto mr-auto"
              >
                Vymazať
              </button>
            </>
          )}
        </div>
      ) : (
        <EditEventForm
          eventInfo={event}
          setEdit={setEdit}
          // setEventInfo={setEventInfo}
          setAllEvents={setAllEvents}
        />
      )}
    </>
  );
}
