import { yesOrNo } from '@/scripts/yesOrNo';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { createDate } from '../scripts/createDate';
import EditEventForm from './EditEventForm';
import gql from 'graphql-tag';
import { EventWithUser } from '@/pages/events';

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
  // const [eventInfo, setEventInfo] = useState<EventTileType>({
  //   id: event.id,
  //   name: event.user.name,
  //   userId: event.userId,
  //   occassion: event.occassion,
  //   start: event.start,
  //   end: event.end,
  //   message: event.message,
  //   people: event.people,
  //   appartments: event.appartments,
  //   whole: event.whole,
  // });

  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      id: event.id,
    },
  });

  console.log(createDate(event.start));
  return (
    <>
      {!edit ? (
        <div className="border-black rounded-md border-solid border-[3px] mt-2 mb-2 flex flex-col">
          <h1>Udalosť: {event.occassion}</h1>
          <p>Od: {createDate(event.start)}</p>
          <p>Do: {createDate(event.end)}</p>
          <h1>Zodpovedná osoba: {event.user.name}</h1>
          <p>Počet ľudí: {event.people}</p>
          <p>Celá chata: {yesOrNo(event.whole)}</p>
          <p>Počet apartmánov, ktorý budeme potrebovať: {event.appartments}</p>
          {event.message ? <p>{event.message}</p> : null}
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
