import React, { useState } from 'react';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import ToDoList from './components/ToDoList/ToDoList';
import { getDate } from './components/Date/Date';

function App() {
  const [tasks, setTasks] = useState([]);
  const { ampm } = getDate();
  
  const addTask = ({ title, duration, completed = false }) => {
    let formattedDuration = duration / 60;

    let formattedDate = '';
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
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

  return (
    <>
      <Header />
      <Container>
        <ToDoList tasks={tasks} addTask={addTask} removeTask={removeTask} completeTask={completeTask} />
      </Container>
    </>
  );
}

export default App;
