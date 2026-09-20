import { useState } from "react";
import "./todo.css"

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        if (inputValue.trim() === "") return
        setTasks([...tasks, inputValue])
        setInputValue("")
    }

    const removeTask = (task_id) => {
        setTasks(tasks.filter((x,i)=>i!==task_id))
    }

    return (
        <div className="todo-main">
            <h3>To Do List</h3>
            <input 
                type="text" 
                onChange={(e) => {setInputValue(e.target.value)}} 
                value={inputValue} 
                placeholder="add new task..."       
                onKeyDown={(e) => {if (e.key === "Enter") {addTask()}}}         
            />
            <br />
            <button onClick={addTask}>Add Task</button>
            <ul className="list">
                {tasks.map((task, index) => {
                    return <li key={index} className="list-item">{task}  <button onClick={() => removeTask(index)}>Remove</button></li>
                })}
            </ul>
        </div>
    )
}