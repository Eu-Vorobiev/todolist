import {useState, useEffect, useRef} from 'react';
import './ToDoList.css';
import ToDoItem from '../ToDoItem/ToDoItem';
import InfoPanel from '../InfoPanel/InfoPanel';

function ToDoList({tasks, addTask, removeTask, completeTask}) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
    
  const descRef = useRef(null);

  const titleHandler = (e) => {
    setTitle(e.currentTarget.value);
  }

  const durationHandler = (e) => {
    setDuration(e.currentTarget.value);
  }

  const onAddTask = () => {
    if(title === '' || duration === '' || duration === 0) return;
    addTask({title, duration});
    setTitle('');
    setDuration('');
  }
  
  useEffect(() => {
    descRef.current.focus();
  }, []);
  
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' && title !== '' && duration !== 0 && duration !== '') {
      onAddTask();
    }
  }

  return (
    <div className="todo-list">
      <div className="todo-add">
        <label htmlFor='task'>
          <input type="text" name="task" placeholder="Task" value={title} onChange={titleHandler} onKeyUp={onKeyPressHandler} ref={descRef}/>
        </label>
        <label htmlFor='duration'>
          <input type="number" name="duration" placeholder="0" value={duration} onChange={durationHandler} onKeyUp={onKeyPressHandler} />
        </label>
        <button type='button' onClick={onAddTask} >+</button>
      </div>
      <InfoPanel tasks={tasks} />
      <ul className='list'>
        {
          tasks.length !== 0 ?
            tasks.map(task => {
              const onRemoveTask = () => {
                removeTask(task.id);
              }
              
              const onCompleteTask = () => {
                completeTask(task);
              }

              return (
                <ToDoItem task={task} key={task.id} onRemoveTask={onRemoveTask} onCompleteTask={onCompleteTask} />
              )
            })
          : <p className='list__empty'>No tasks</p>
        }
      </ul>
    </div>
  )
}

export default ToDoList;