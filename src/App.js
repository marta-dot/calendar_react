import './App.css';
import React from "react";
import {useState, useEffect} from "react";
import Calendar from "./Calendar";
import Editor from "./Editor";

export default function App() {
  const [holidays, setHolidays] = useState([]);
  // const [events, setEvents] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth());

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currentDay = new Date().getDate();
  const [day, setDay] = useState(currentDay);

  // const [data, setData] = useState({day: '', month: '', title: '', description: '', selectedColor: ''});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2024/PL');
        if (!response.ok) {throw new Error('Failed to fetch holidays');}

        const data = await response.json();
        setHolidays(data);
        //console.log(data.response.holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    fetchHolidays();
  }, []);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/event');
  //       if (!response.ok) {throw new Error('Failed to fetch events');}
  //
  //       const data = await response.json();
  //       setEvents(data);
  //       //console.log(data.response.holidays);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  function handleMonthChange(direction) {
    setMonth(currentMonth => {
      const newMonth = direction === 'next' ? currentMonth + 1 : currentMonth - 1;
      return (newMonth + 12) % 12; // Ensure month stays within 0-11
    });
  }

  function handleSquareClick(number) {
    if(day === number) setIsEditorVisible(!isEditorVisible);
    if(day !== number && !isEditorVisible) setIsEditorVisible(!isEditorVisible);
    setDay(number);
  }

  function handleData(newData) {
    setIsEditorVisible(!isEditorVisible);

    const dataIndex = data.findIndex(d => d.day === day && d.month === month);
    if (dataIndex > -1) {
      // Update existing data
      const updatedData = [...data]; // Create a copy of the data array
      updatedData[dataIndex] = { ...updatedData[dataIndex], ...newData }; // Update the existing data object
      setData(updatedData);
    } else {
      // Add new data
      setData(currentData => [...currentData, newData]);
    }
  }

  return (
    <div className="App">

      {/*{events.map(event => (*/}
      {/*  <div key={event.date}>{event.title}</div> // Assuming each event has a unique 'id' and a 'title'*/}
      {/*))}*/}

      <div className="main">
        <Header month={month} onClick={handleMonthChange} month_array={month_array}/>
        <br/>
        <Calendar holidays={holidays} data={data} month={month} onClick={handleSquareClick} currentDay={currentDay}/>
      </div>

      {isEditorVisible && <Editor data={data} onClick={handleData} month={month} day={day} month_array={month_array}/>}
    </div>
  );
}

function Header({month, onClick, month_array}) {

  return (
    <header>
      <button onClick={() => onClick('prev')}><i className="arrow left"></i></button>
      <span className={'month'}>{month_array[month]}</span>
      <button onClick={() => onClick('next')}><i className="arrow right"></i></button>
    </header>
  )
}