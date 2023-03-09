import { useState } from 'react';
import Calendar from 'react-calendar';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import * as gregorian from 'cldr-data/main/sk/ca-gregorian.json';
import * as numbers from 'cldr-data/main/sk/numbers.json';
import * as timeZoneNames from 'cldr-data/main/sk/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

L10n.load({
  sk: {
    calendar: { today: 'dnes' },
  },
});

export default function Availability() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="bg-view bg-cover h-screen flex justify-center">
        <div className="bg-[#655b5a] h-fit mt-20 w-[80vw] border-solid border-4 rounded-md border-[#222807] flex flex-col gap-3">
          <h1 className="text-center font-gloock mt-2 text-xl text-white">Kalendár</h1>
          <div className="">
            <Calendar locale="sk" onChange={setDate} value={date} />
          </div>
          <p className="text-center font-gloock mb-2 text-lg text-white">
            <span className="bold ">Zvolený dátum:</span> {date.toLocaleDateString()}
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
}
