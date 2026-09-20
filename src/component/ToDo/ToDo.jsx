import { useState } from "react";
import "./todo.css"

export const ToDo = () => {
    const [tasks, setTasks] = useState([
        "First Task"
    ])

    return (
        <div className="todo-main">
            <h3>To Do List</h3>
            <input type="text" placeholder="add new task..."/>
            <br />
            <button>Add Task</button>
            <ul className="list">
                {tasks.map((task, index) => {
                    return <li key={index} className="list-item">{task}</li>
                })}
            </ul>
        </div>
    )
}