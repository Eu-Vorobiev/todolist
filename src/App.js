import React, { useState } from 'react';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  let initTasks = [
    { id: 1, title: 'Task 1', duration: 1, date: '2020-12-12' },
    { id: 2, title: 'Task 2', duration: 2, date: '2020-12-12' },
  ]
  
  const [tasks, setTasks] = useState(initTasks);
  
  const addTask = ({ title, duration, date = '' }) => {
    let formattedDuration = duration / 60;
    let newTask = { id: Math.random(), title: title, duration: formattedDuration, date: date }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }
  
  const removeTask = (id) => {
    let newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  let newSettedTask = tasks;

  return (
    <>
      <Header />
      <Container>
        <ToDoList tasks={newSettedTask} addTask={addTask} removeTask={removeTask} />
      </Container>
    </>
  );
}

export default App;
