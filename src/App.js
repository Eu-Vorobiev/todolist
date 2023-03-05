import React, { useState } from 'react';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  let initTasks = [
    { id: 1, title: 'Task 1', duration: 1, date: '2020-12-12', completed: false},
    { id: 2, title: 'Task 2', duration: 2, date: '2020-12-12', completed: false},
  ]
  
  const [tasks, setTasks] = useState(initTasks);
  
  const addTask = ({ title, duration, completed = false }) => {
    let formattedDuration = duration / 60;

    let formattedDate = '';
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    formattedDate = `${hours}:${minutes} ${ampm}`;
    
    let newTask = { id: Math.random(), title: title, duration: formattedDuration, date: formattedDate, completed: completed }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }
  
  const removeTask = (id) => {
    let newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const completeTask = (task) => {
    let newTasks = [...tasks];
    task.completed = !task.completed;
    setTasks(newTasks);
  }

  let newSettedTask = tasks;

  return (
    <>
      <Header />
      <Container>
        <ToDoList tasks={newSettedTask} addTask={addTask} removeTask={removeTask} completeTask={completeTask} />
      </Container>
    </>
  );
}

export default App;
