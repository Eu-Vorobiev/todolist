import { useState, useEffect, useRef, useCallback } from 'react';
import AddPanel from '../AddPanel/AddPanel';
import InfoPanel from '../InfoPanel/InfoPanel';
import ToDoItem from '../ToDoItem/ToDoItem';
import FilterPanel from '../FilterPanel/FilterPanel';
import './ToDoList.css';

const ToDoList = ({ tasks, addTask, removeTask, completeTask, duration, durationHandler, totalTime, changeFilter }) => {
    const [title, setTitle] = useState('');
    const firstInputFocusRef = useRef(null);

    const titleHandler = (e) => setTitle(e.currentTarget.value);
    const isValidInput = () => title !== '' && duration !== 0 && duration !== '';

    const onAddTask = () => {
        if (!isValidInput()) return;
        addTask({ title, duration });
        setTitle('');
        firstInputFocusRef.current.focus();
    };

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter' && isValidInput()) {
            onAddTask();
        }
    };

    const onRemoveTask = useCallback((task) => () => {
        removeTask(task);
    }, [removeTask]);
    
    const onCompleteTask = useCallback((task) => () => {
        completeTask(task);
    }, [completeTask]);

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
                        return (
                            <ToDoItem
                                task={task}
                                key={task.id}
                                totalTime={totalTime}
                                onRemoveTask={onRemoveTask(task)}
                                onCompleteTask={onCompleteTask(task)}
                            />
                        );
                    })
                ) : (
                    <p className="list__empty">No tasks</p>
                )}
            </ul>

            <FilterPanel changeFilter={changeFilter} />
        </div>
    );
}

export default ToDoList;