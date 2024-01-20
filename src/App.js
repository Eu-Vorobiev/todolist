import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ThemeContext from './components/ThemeContext/ThemeContext';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import ToDoList from './components/ToDoList/ToDoList';
import { getDate } from './components/Date/Date';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const { hours, minutes, ampm } = getDate();
	const [duration, setDuration] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [theme, setTheme] = useState('light-theme');
	const toggleTheme = () => setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');

	const addTask = ({ title, duration, completed = false }) => {
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
	};

	const removeTask = task => {
		let newTasks = tasks.filter(
			taskFromFilter => taskFromFilter.id !== task.id
		);
		setTasks(newTasks);
		setTotalTime(totalTimeHandler(totalTime, task.duration, false));
	};

	const completeTask = task => {
		let newTasks = [...tasks];
		task.completed = !task.completed;
		newTasks.sort((a, b) => a.completed - b.completed);
		setTasks(newTasks);
	};

	const totalTimeHandler = (total, current, hasAdd = true) => {
		let newTotalTime = hasAdd
			? (total + current).toFixed(2)
			: (total - current).toFixed(2);
		return parseFloat(newTotalTime);
	};

	const durationHandler = e => setDuration(parseInt(e.currentTarget.value));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* Lib for add a classname on body */}
            <Helmet bodyAttributes={{class: theme}} />
			<Header />
			<Container>
				<ToDoList
					tasks={tasks}
					addTask={addTask}
					removeTask={removeTask}
					completeTask={completeTask}
					duration={duration}
					durationHandler={durationHandler}
					totalTime={totalTime}
				/>
			</Container>
		</ThemeContext.Provider>
	);
}
