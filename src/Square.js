import React, { useState, useEffect } from 'react';
import databaseAdapter from './databaseAdapter';


export default function Square({holidays, data, day, month, onClick, style}) {

  let holidayName = '';
  // let events = [];

  // Check if holidays is an array and not undefined
  if (Array.isArray(holidays)) {
    // Find the first holiday that matches the given day and month
    const matchingHoliday = holidays.find(holiday => {
      const [year, monthHoliday, dayHoliday] = holiday.date.split('-').map(Number);
      return dayHoliday === day && monthHoliday-1 === month;
    });

    // If a matching holiday is found, update holidayName
    if (matchingHoliday) {
      holidayName = matchingHoliday.name;
    }
  }

  // let events = [];

  // useEffect(() => {
  //   async function fetchEvents() {
  //     // Assuming `databaseAdapter` is correctly set up to query your database
  //     const adapter = new databaseAdapter();
  //     const result = await adapter.query('SELECT * FROM events');
  //     // events = result.rows;
  //     console.log(result.rows);
  //   }
  //   fetchEvents();
  // }, [day, month]);

  return (
    <div className='square' onClick={() => onClick(day)}>
      <div className={'square_header'}>
        <span className='square_value' style={style}>{day}</span>
        <span>{holidayName}</span>
      </div>

      {data && data.day === day && (
        <div className='square_data'>
          <span style={{backgroundColor: data.selectedColor}} className={'title data'}>{data.title}</span>
          <span className={'description data'}>{data.description}</span>
        </div>
      )
    }
    </div>
  )
}
