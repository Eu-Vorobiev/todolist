import React from 'react';
import './Header.css';
import { getDate } from '../Date/Date';

function Header() {
  const { dayName, dayNum, hours, minutes, ampm } = getDate();

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
