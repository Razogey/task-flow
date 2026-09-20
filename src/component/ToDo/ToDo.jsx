import { useState } from "react";
import "./todo.css"

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        setTasks([...tasks, inputValue])
        setInputValue("")
    }

    return (
        <div className="todo-main">
            <h3>To Do List</h3>
            <input 
                type="text" 
                onChange={(e) => {setInputValue(e.target.value)}} 
                value={inputValue} 
                placeholder="add new task..."          
            />
            <br />
            <button onClick={addTask}>Add Task</button>
            <ul className="list">
                {tasks.map((task, index) => {
                    return <li key={index} className="list-item">{task}</li>
                })}
            </ul>
        </div>
    )
}