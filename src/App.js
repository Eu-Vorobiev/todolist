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

	const formatDuration = (duration) => {
		if (String(duration).includes('.')) {
			let [hours, minutes] = String(duration).split('.');
			let totalHours = Number(hours) + Number(minutes) / 60;
			return parseFloat(totalHours.toFixed(2));
		} else {
			let totalHours = Number(duration) / 60;
			return parseFloat(totalHours.toFixed(2));
		}
	};

	const addTask = useCallback(
		({ title, duration, completed = false, isEdit = false, isHover = false }) => {
			const formattedDuration = formatDuration(duration);
			const formattedDate = `${hours}:${minutes} ${ampm}`;

			let newTask = {
				id: Math.random(),
				title,
				duration: formattedDuration,
				date: formattedDate,
				completed,
				isEdit,
				isHover
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

	const editTask = useCallback(
		(task, newTitle, newDuration) => {
			const formattedDuration = formatDuration(newDuration);
			let newTasks = tasks.map(t =>
				t.id === task.id ? { ...t, isEdit: !task.isEdit, title: newTitle, duration: formattedDuration } : t
			);
			setTasks(newTasks);
		}, [tasks]
	);

	const hoverTaskHandler = useCallback(
		task => {
			let newTasks = tasks.map(t =>
				t.id === task.id ? { ...t, isHover: !t.isHover } : t
			);
			setTasks(newTasks);
		}, [tasks]
	);

	const totalTimeHandler = (total, current, hasAdd = true) => {
		let newTotalTime = hasAdd
			? total + current
			: total - current
		return parseFloat(newTotalTime.toFixed(2));
	};

	const durationHandler = (e) => {
		const value = e.currentTarget.value;
		setDuration(value === '' ? 0 : parseInt(value));
	}

	const changeFilter = useCallback(filter => setFilter(filter), []);

	useEffect(() => {
		let newFilteredTasks = tasks;
		if (filter === 'in-progress') {
			newFilteredTasks = tasks.filter(task => !task.completed);
		}
		if (filter === 'completed') {
			newFilteredTasks = tasks.filter(task => task.completed);
		}
		const updatedTime = newFilteredTasks.reduce((total, task) => total + task.duration, 0);
		setTotalTime(updatedTime);
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
				hoverTaskHandler={hoverTaskHandler}
				editTask={editTask}
				duration={duration}
				durationHandler={durationHandler}
				totalTime={totalTime}
				changeFilter={changeFilter}
			/>
		</ThemeContext.Provider>
	);
}
