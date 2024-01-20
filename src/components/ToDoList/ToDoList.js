import { useState, useEffect, useRef } from 'react';
import AddPanel from '../AddPanel/AddPanel';
import InfoPanel from '../InfoPanel/InfoPanel';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';

const ToDoList = ({ tasks, addTask, removeTask, completeTask, duration, durationHandler, totalTime }) => {
    const [title, setTitle] = useState('');
    const firstInputFocusRef = useRef(null);

    const titleHandler = (e) => setTitle(e.currentTarget.value);

    const onAddTask = () => {
        if (title === '' || duration === '' || duration === 0) return;
        addTask({ title, duration });
        setTitle('');
        firstInputFocusRef.current.focus();
    };

    const onKeyPressHandler = (e) => {
        if (
            e.key === 'Enter' &&
            title !== '' &&
            duration !== 0 &&
            duration !== ''
        ) {
            onAddTask();
        }
    };

    useEffect(() => {
        if (firstInputFocusRef.current) {
            firstInputFocusRef.current.focus();
        }
    }, []);

    return (
        <div className="todo-list">
            <AddPanel title={title} duration={duration} firstInputFocusRef={firstInputFocusRef} titleHandler={titleHandler} durationHandler={durationHandler} onAddTask={onAddTask} onKeyPressHandler={onKeyPressHandler} />
      
            <InfoPanel tasks={tasks} totalTime={totalTime} />
      
            <ul className="list">
                {tasks.length !== 0 ? (
                    tasks.map((task) => {
                        const onRemoveTask = () => removeTask(task);

                        const onCompleteTask = () => completeTask(task);

                        return (
                            <ToDoItem
                                task={task}
                                key={task.id}
                                totalTime={totalTime}
                                onRemoveTask={onRemoveTask}
                                onCompleteTask={onCompleteTask}
                            />
                        );
                    })
                ) : (
                    <p className="list__empty">No tasks</p>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;