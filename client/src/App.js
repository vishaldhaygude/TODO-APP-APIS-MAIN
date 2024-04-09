import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App(){
  const [tasks,setTasks] =useState([])
  const [task,setTask] =useState('')
  const [priority,setPriority] =useState('')


  const loadTasks =async()=>{
    const response = await axios.get('http://localhost:5000/all-tasks')
    
    setTasks(response.data.data);
  }

useEffect(()=>{
  loadTasks();

}, [])

const addTask =async ()=>{
  const response = await axios.post('http://localhost:5000/create-task',{
  id: Math.floor(Math.random() * 1000),
  title: task,
  priority: priority
})

loadTasks();

alert(response.data.message);
}

  return (
    <div className='todo-container'>
      <h1 className='todo-heading'>ToDO App By Vishal</h1>
      {
        tasks.map((task,i)=>{
          const {id, title, priority} =task;

          return(
            <div className='task-card'>
              <p className='task-title'>{id}) {title}</p>
              <span className='priority'>{priority}</span>
              </div>
          )
        })
      }

      <input type='text'
       placeholder='Enter task'
        className='task-input'
        value={task}
        onChange={(e)=>{setTask(e.target.value)}}
        />
      <select className='priority-select'
      value={priority}
      onChange={(e)=>{setPriority(e.target.value)}}>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>

      </select>
      <button type='button' className='add-task-btn' onClick={addTask}>Add Task</button>

    </div>
  )
}

export default App                                                                      