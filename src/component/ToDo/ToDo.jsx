import { useState } from "react";
import "./todo.css"

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([])

    const addTask = () => {
        if (inputValue.trim() === "") return
        setTasks([...tasks, { text: inputValue, completed: false, isEditing: false }])
        setInputValue("")
    }

    const removeTask = (task_id) => {
        setTasks(tasks.filter((_, i) => i !== task_id))
    }

    const changeStatus = (targetedIndex) => {
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return {...task, completed: !task.completed}
            }
            return task
        }))
    }

    const startEditing = (targetedIndex) => {
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return { ...task, isEditing: true }
            }
            return task
        }))
    }

    const saveEdit = (targetedIndex, newText) => {
        if (newText.trim() === "") return;
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return { ...task, text: newText, isEditing: false }
            }
            return task
        }))
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
                {tasks?.map((task, index) => {
                    return (
                        <li key={index} className="list-item">
                            {task.isEditing ? (
                                <input 
                                    type="text"
                                    defaultValue={task.text}
                                    autoFocus
                                    onBlur={(e) => saveEdit(index, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveEdit(index, e.target.value)
                                        }
                                    }}
                                />
                            ) : (
                                <span 
                                    onDoubleClick={() => startEditing(index)}
                                    onClick={() => changeStatus(index)}
                                    style={{ 
                                        textDecoration: task.completed ? "line-through" : "none",
                                        cursor: "pointer",
                                        opacity: task.completed ? 0.6 : 1 ,
                                        color: task.completed ? "#ff0000" : "#6b6375"
                                    }}
                                    title="Double click to edit"
                                >
                                    {task.text}  
                                </span>
                            )}

                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => changeStatus(index)} 
                            />

                            <button onClick={() => removeTask(index)}>Remove</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}