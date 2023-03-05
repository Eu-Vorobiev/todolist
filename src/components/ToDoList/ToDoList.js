import React, {useState} from 'react';
import './ToDoList.css';
import ToDoItem from '../ToDoItem/ToDoItem';

function ToDoList(props) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);

  const titleHandler = (e) => {
    setTitle(e.currentTarget.value);
  }

  const durationHandler = (e) => {
    setDuration(e.currentTarget.value);
  }

  const onAddTask = () => {
    if(title === '' || duration === 0) return;
    props.addTask({title, duration});
    setTitle('');
    setDuration(0);
  }

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' && title !== '' && duration !== 0) {
      onAddTask();
    }
  }

  return (
    <div className="todo-list">
      <div className="todo-add">
        <label htmlFor='task'>
          <input type="text" name="task" placeholder="Task" value={title} onChange={titleHandler} onKeyUp={onKeyPressHandler} />
        </label>
        <label htmlFor='duration'>
          <input type="number" name="duration" placeholder="0" value={duration} onChange={durationHandler} onKeyUp={onKeyPressHandler} />
        </label>
        <button type='button' onClick={onAddTask} >+</button>
      </div>
      <ul className='list'>
        {
          props.tasks.length !== 0 ?
            props.tasks.map(task => {
              const onRemoveTask = () => {
                props.removeTask(task.id);
              }

              return (
                <ToDoItem task={task} key={task.id} onRemoveTask={onRemoveTask} />
              )
            })
          : <p className='list__empty'>No tasks</p>
        }
      </ul>
    </div>
  )
}

export default ToDoList;