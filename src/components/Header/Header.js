import React from 'react';
import './Header.css';

function Header() {
  let date = new Date();
  let day = date.getDay();
  let dayNum = date.getDate();
  let dayName = '';
  switch (day) {
    case 0:
      dayName = 'sun';
      break;
    case 1:
      dayName = 'mon';
      break;
    case 2:
      dayName = 'tue';
      break;
    case 3:
      dayName = 'wed';
      break;
    case 4:
      dayName = 'thu';
      break;
    case 5:
      dayName = 'fri';
      break;
    case 6:
      dayName = 'sat';
      break;
    default:
      dayName = 'sun';
      break;
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return (
    <header className="header">
      <time>
        <span className='day'>{dayName} {dayNum}</span>
        <span>{hours}<span className='pulse'>:</span>{minutes} {ampm}</span>
      </time>
    </header>
  );
}

export default Header;
