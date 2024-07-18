import React, {useEffect, useState} from "react";

export default function Editor({data, month_array, month, day, onClick}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  React.useEffect(() => {
    const existingData = data.find(d => d.day === day && d.month === month);
    if (existingData) {
      setTitle(existingData.title);
      setDescription(existingData.description);
      setSelectedColor(existingData.selectedColor);
    }
  }, [day, month, data]);

  const [nameDay, setNameDay] = useState('');

  useEffect(() => {
    const fetchNameDays = async () => {
      try {
        const params = new URLSearchParams({
          "day": day.toString(),
          "month": (month + 1).toString(),
          "country": "pl",
        });
        const url = `https://nameday.abalin.net/api/V1/getdate?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch name days');
        }
        const data = await response.json();
        setNameDay(data.nameday.pl);
        // console.log(data.nameday.pl);
        // console.log(data.month);
      } catch (error) {
        console.error('Error fetching name days:', error);
      }
    };
    fetchNameDays();
  }, [day, month]);

  return (
    <div className='editor'>
      <div className={'name_day'}>
        <h>Nameday:</h>
        <p>{nameDay}</p>
      </div>

      <span>{day} {month_array[month]}</span>
      <span>Editor</span>

      <div className={'form'}>
        <input value={title} onChange={e => setTitle(e.target.value)} type='text'
               placeholder={data.find(d => d.day === day && d.month === month) ? data.find(d => d.day === day && d.month === month).title : 'Title'}/>

        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{height: '150px'}}
                  placeholder={data.find(d => d.day === day && d.month === month) ? data.find(d => d.day === day && d.month === month).description : 'Description'}/>

        <div className={'color_form'}>
          <label className={'container'}>
            <input type="radio" name="radio" checked="checked" onChange={e => setSelectedColor('')}/>
            <span className="checkmark" style={{background: 'white'}}></span>
          </label>

          <label className={'container'}>
            <input type="radio" name="radio" onChange={e => setSelectedColor('#baa398')}/>
            <span className="checkmark" style={{background: '#baa398'}}></span>
          </label>

          <label className={'container'}>
            <input type="radio" name="radio" onChange={e => setSelectedColor('#a99e9f')}/>
            <span className="checkmark" style={{background: '#a99e9f'}}></span>
          </label>

          <label className={'container'}>
            <input type="radio" name="radio" onChange={e => setSelectedColor('#ead7bd')}/>
            <span className="checkmark" style={{  background: '#ead7bd'}}></span>
          </label>
        </div>

        <button onClick={() => onClick({day, month, title, description, selectedColor})}>Save</button>
      </div>
    </div>
  )
}