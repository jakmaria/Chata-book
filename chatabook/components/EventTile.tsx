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
  mutation deleteMutation($id: ID!) {
    deleteEvent(id: $id) {
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
    },
  });

  return (
    <>
      {!edit ? (
        <div className="text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow font-gloock text-[18px] mt-2 mb-2 mr-auto ml-auto flex flex-col bg-[#ACD7E5] min-w-[45vw] max-w-[60vw] opacity-80">
          <h1>
            Udalosť: <span className="text-red-600">{event.occassion}</span>
          </h1>
          <p>
            Od: <span className="text-red-600">{createDate(event.start)}</span>
          </p>
          <p>
            Do: <span className="text-red-600">{createDate(event.end)}</span>
          </p>
          <h1>
            Zodpovedná osoba: <span className="text-red-600">{event.user.name}</span>
          </h1>
          <p>
            Počet ľudí: <span className="text-red-600">{event.people}</span>
          </p>
          <p>
            Celá chata: <span className="text-red-600">{yesOrNo(event.whole)}</span>
          </p>
          <p>
            Počet apartmánov, ktorý budeme potrebovať:{' '}
            <span className="text-red-600">{event.appartments}</span>
          </p>
          {event.message ? <p>{event.message}</p> : null}
          {event.userId === Number(userData?.userData?.id) && (
            <>
              <button
                onClick={() => setEdit(true)}
                className="border-black rounded-md border-solid border-[3px] mb-1"
              >
                Upravit
              </button>
              <button
                onClick={() => deleteEvent()}
                className="border-black rounded-md border-solid border-[3px] mb-1"
              >
                Vymazat
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
