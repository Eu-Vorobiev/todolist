import { useState } from 'react';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import ToDoList from './components/ToDoList/ToDoList';
import { getDate } from './components/Date/Date';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const { hours, minutes, ampm } = getDate();
    const [duration, setDuration] = useState(0);
    let [totalTime, setTotalTime] = useState(0);

    const addTask = ({ title, duration, completed = false }) => {
        let dividedDuration = duration / 60;
        let formattedDuration = duration >= 10 ? parseFloat(dividedDuration.toFixed(2)) : Number(duration);
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
        setTotalTime(totalTime + formattedDuration);
        setDuration('');
    };

    const removeTask = ( task ) => {
        let newTasks = tasks.filter((taskFromFilter) => taskFromFilter.id !== task.id);
        setTasks(newTasks);
        let newTotalTime = (totalTime - task.duration).toFixed(2);
        setTotalTime(parseFloat(newTotalTime));
    };

    const completeTask = (task) => {
        let newTasks = [...tasks];
        task.completed = !task.completed;
        setTasks(newTasks);
    };

    const durationHandler = e => setDuration(parseInt(e.currentTarget.value));

    return (
        <>
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
        </>
    );
}