import React from "react";
// import {useState} from "react";
import Square from "./Square";


export default function Calendar({holidays,data, month, onClick, currentDay}) {

  const day_array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const firstDay = new Date(new Date().getFullYear(), month, 1).getDay();
  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();

  return (
    <div className='calendar'>

      {day_array.map((day, i) => (
        <span className='day' key={i}>{day}   </span>
      ))}

      {Array(firstDay ? firstDay - 1 : 6).fill(null).map((_, i) => (
        <div key={i} className='Square' style={{background: 'transparent', border: '1px solid transparent'}}></div>
      ))}

      {Array(Math.ceil(daysInMonth / 7)).fill(null).map((_, i) => (
        <>
          {Array(7).fill(null).map((_, j) => {
            const index = i * 7 + j;
            if (index > daysInMonth - 1) return null;
            const dayData = data.find(d => d.day === index + 1 && d.month === month) || {};
            const squareStyle = index === currentDay - 1 && month === new Date().getMonth() ? {background: '#ead7bd'} : {};
            return (
              <Square style={squareStyle}  month={month} holidays={holidays} data={dayData} onClick={() => onClick(index + 1)} key={index} day={index + 1}/>
            );
          })}
        </>
      ))}
    </div>
  )
}