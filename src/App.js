import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ThemeContext from './components/ThemeContext/ThemeContext';
import Header from './components/Header/Header';
import ToDoList from './components/ToDoList/ToDoList';
import { getDate } from './components/Date/Date';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState(tasks);
	const [filter, setFilter] = useState('all');
	const { hours, minutes, ampm } = getDate();
	const [duration, setDuration] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [theme, setTheme] = useState('light-theme');
	const toggleTheme = () => setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');

	const addTask = useCallback(
		({ title, duration, completed = false }) => {
			let dividedDuration = duration / 60;
			let formattedDuration =
				duration >= 10
					? parseFloat(dividedDuration.toFixed(2))
					: Number(duration);
			let formattedDate = `${hours}:${minutes} ${ampm}`;

			let newTask = {
				id: Math.random(),
				title,
				duration: formattedDuration,
				date: formattedDate,
				completed,
			};
			let newTasks = [newTask, ...tasks];
			setTasks(newTasks);
			setTotalTime(totalTimeHandler(totalTime, formattedDuration));
			setDuration('');
		},
		[tasks, hours, minutes, ampm, totalTime]
	);

	const removeTask = useCallback(
		task => {
			let newTasks = tasks.filter(
				taskFromFilter => taskFromFilter.id !== task.id
			);
			setTasks(newTasks);
			setTotalTime(totalTimeHandler(totalTime, task.duration, false));
		},
		[tasks, totalTime]
	);

	const completeTask = useCallback(
		task => {
			let newTasks = tasks.map(t => 
				t.id === task.id ? { ...t, completed: !t.completed } : t
			);
			newTasks.sort((a, b) => a.completed - b.completed);
			setTasks(newTasks);
		}, [tasks]
	);

	const totalTimeHandler = (total, current, hasAdd = true) => {
		let newTotalTime = hasAdd
			? (total + current).toFixed(2)
			: (total - current).toFixed(2);
		return parseFloat(newTotalTime);
	};

	const durationHandler = e => setDuration(parseInt(e.currentTarget.value));

	const changeFilter = useCallback(filter => setFilter(filter), []);

	useEffect(() => {
		let newFilteredTasks = tasks;
		if (filter === 'in-progress') {
			newFilteredTasks = tasks.filter(task => !task.completed);
		}
		if (filter === 'completed') {
			newFilteredTasks = tasks.filter(task => task.completed);
		}
		setFilteredTasks(newFilteredTasks);
	}, [tasks, filter]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{/* Lib for add a classname on body */}
			<Helmet bodyAttributes={{ class: theme }} />
			<Header />
			<ToDoList
				tasks={filteredTasks}
				addTask={addTask}
				removeTask={removeTask}
				completeTask={completeTask}
				duration={duration}
				durationHandler={durationHandler}
				totalTime={totalTime}
				changeFilter={changeFilter}
			/>
		</ThemeContext.Provider>
	);
}
