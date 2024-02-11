import { useState, useEffect } from 'react';
import { getDate } from '../Date/Date';
import './CurrentDate.css';

const CurrentDate = () => {
	const { dayName, dayNum, hours, minutes, ampm } = getDate();
	const [dayNameState, setDayName] = useState(dayName);
	const [dayNumState, setDayNum] = useState(dayNum);
	const [hoursState, setHours] = useState(hours);
	const [minutesState, setMinutes] = useState(minutes);
	const [ampmState, setAmpm] = useState(ampm);

	useEffect(() => {
		const interval = setInterval(() => {
			const { dayName, dayNum, hours, minutes, ampm } = getDate();
			setDayName(dayName);
			setDayNum(dayNum);
			setHours(hours);
			setMinutes(minutes);
			setAmpm(ampm);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<time 
			className="datetime"
			onMouseOver={(event) => event.stopPropagation()}
			onMouseOut={(event) => event.stopPropagation()}
		>
			<span className="day">
				{dayNameState} {dayNumState}
			</span>
			<span>
				{hoursState}
				<span className="pulse">:</span>
				{minutesState} {ampmState}
			</span>
		</time>
	);
};

export default CurrentDate;
