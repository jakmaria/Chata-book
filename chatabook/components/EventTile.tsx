import { yesOrNo } from '@/scripts/yesOrNo';
import { createDate } from '../scripts/createDate';

export default function EventTile({
  name,
  occassion,
  start,
  end,
  message,
  people,
  appartments,
  whole,
}: {
  name: string;
  occassion: string;
  start: Date;
  end: Date;
  message?: string | null;
  people: number;
  appartments?: number;
  whole: boolean;
}) {
  return (
    <>
      <div className='border-black rounded-md border-solid border-[3px] mt-2 mb-2 flex flex-col'>
        <h1>Kto objednal chatu? {name}</h1>
        <h1>Udalosť: {occassion}</h1>
        <p>Počet ľudí: {people}</p>
        <p>Chceme celú chatu: {yesOrNo(whole)}</p>
        <p>Začíname</p>
        <p>{createDate(start)}</p>
        <p>Končíme</p>
        <p>{createDate(end)}</p>
        <p>Počet apartmánov, ktorý budeme potrebovať: {appartments}</p>
        {message ? <p>{message}</p> : null}
        <button className='border-black rounded-md border-solid border-[3px] mb-1' >Upravit</button>
        <button className='border-black rounded-md border-solid border-[3px] mb-1'>Vymazat</button>
      </div>
    </>
  );
}
