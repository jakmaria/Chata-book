import { yesOrNo } from '@/scripts/yesOrNo';
import { useState } from 'react';
import { createDate } from '../scripts/createDate';
import EditEventForm from './EditEventForm';

export type EventTileType = {
  name: string;
  occassion: string;
  start: Date;
  end: Date;
  message?: string | null;
  people: number;
  appartments?: number;
  whole: boolean;
};

export default function EventTile({
  name,
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
    name,
    occassion,
    start,
    end,
    message,
    people,
    appartments,
    whole,
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
          <button className="border-black rounded-md border-solid border-[3px] mb-1">
            Vymazat
          </button>
        </div>
      ) : (
        <EditEventForm eventInfo={eventInfo} setEdit={setEdit} setEventInfo={setEventInfo} />
      )}
    </>
  );
}
