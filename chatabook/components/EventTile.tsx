import { yesOrNo } from '@/scripts/yesOrNo';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { createDate } from '../scripts/createDate';
import EditEventForm from './EditEventForm';
import gql from 'graphql-tag';

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
  id,
  name,
  userId,
  occassion,
  start,
  end,
  message,
  people,
  appartments,
  whole,
}: EventTileType) {
  const [edit, setEdit] = useState<Boolean>(false);
  const [eventInfo, setEventInfo] = useState<EventTileType>({
    id,
    name,
    userId,
    occassion,
    start,
    end,
    message,
    people,
    appartments,
    whole,
  });

  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    variables: {
      id: eventInfo.id,
    },
  });
  return (
    <>
      {!edit ? (
        <div className="border-black rounded-md border-solid border-[3px] mt-2 mb-2 flex flex-col">
          <h1>Udalosť: {eventInfo.occassion}</h1>
          <p>Od: {createDate(eventInfo.start)}</p>
          <p>Do: {createDate(eventInfo.end)}</p>
          <h1>Zodpovedná osoba: {eventInfo.name}</h1>
          <p>Počet ľudí: {eventInfo.people}</p>
          <p>Celá chata: {yesOrNo(eventInfo.whole)}</p>
          <p>Počet apartmánov, ktorý budeme potrebovať: {eventInfo.appartments}</p>
          {eventInfo.message ? <p>{eventInfo.message}</p> : null}
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
        <EditEventForm eventInfo={eventInfo} setEdit={setEdit} setEventInfo={setEventInfo} />
      )}
    </>
  );
}
