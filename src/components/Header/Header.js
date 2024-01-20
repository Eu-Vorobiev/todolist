import { useState, useEffect, useContext } from 'react';
import ThemeContext from '../ThemeContext/ThemeContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { getDate } from '../Date/Date';
import './Header.css';

const Header = () => {
	const { dayName, dayNum, hours, minutes, ampm } = getDate();
	const [dayNameState, setDayName] = useState(dayName);
	const [dayNumState, setDayNum] = useState(dayNum);
	const [hoursState, setHours] = useState(hours);
	const [minutesState, setMinutes] = useState(minutes);
	const [ampmState, setAmpm] = useState(ampm);
	const { toggleTheme } = useContext(ThemeContext);

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
		<header className="header">
			<ThemeToggler toggleTheme={toggleTheme} />
			<time>
				<span className="day">
					{dayNameState} {dayNumState}
				</span>
				<span>
					{hoursState}
					<span className="pulse">:</span>
					{minutesState} {ampmState}
				</span>
			</time>
		</header>
	);
}

export default Header;
