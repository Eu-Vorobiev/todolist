import { useState, useEffect } from 'react';
import './Header.css';
import { getDate } from '../Date/Date';

function Header() {
  const { dayName, dayNum, hours, minutes, ampm } = getDate();
  const [dayNameState, setDayName] = useState(dayName);
  const [dayNumState, setDayNum] = useState(dayNum);
  const [hoursState, setHours] = useState(hours);
  const [minutesState, setMinutes] = useState(minutes);
  const [ampmState, setAmpm] = useState(ampm);

  useEffect(() => {
    const interval = setInterval(() => {
      setDayName(dayNameState);
      setDayNum(dayNumState);
      setHours(hoursState);
      setMinutes(minutesState);
      setAmpm(ampmState);
    }, 1000);
    return () => clearInterval(interval);
  });
  
  return (
    <header className="header">
      <time>
        <span className='day'>{dayNameState} {dayNumState}</span>
        <span>{hoursState}<span className='pulse'>:</span>{minutesState} {ampmState}</span>
      </time>
    </header>
  );
}

export default Header;
