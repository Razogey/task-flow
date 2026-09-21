import { useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskItem } from "../TaskItem";
import "./todo.css";

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (inputValue.trim() === "") return;
        setTasks([...tasks, { text: inputValue, completed: false, isEditing: false }]);
        setInputValue("");
    };

    const removeTask = (task_id) => {
        setTasks(tasks.filter((_, i) => i !== task_id));
    };

    const changeStatus = (targetedIndex) => {
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return {...task, completed: !task.completed};
            }
            return task;
        }));
    };

    const startEditing = (targetedIndex) => {
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return { ...task, isEditing: true };
            }
            return task;
        }));
    };

    const saveEdit = (targetedIndex, newText) => {
        if (newText.trim() === "") return;
        setTasks(tasks.map((task, index) => {
            if (index === targetedIndex) {
                return { ...task, text: newText, isEditing: false };
            }
            return task;
        }));
    };

    return (
        <div className="todo-main">
            <h3>To Do List</h3>
            
            {/* استخدام مكون الإدخال */}
            <TaskInput 
                inputValue={inputValue} 
                setInputValue={setInputValue} 
                addTask={addTask} 
            />

            <br />
            
            <ul className="list">
                {tasks?.map((task, index) => (
                    // استخدام مكون العنصر الفردي
                    <TaskItem 
                        key={index}
                        task={task}
                        index={index}
                        changeStatus={changeStatus}
                        startEditing={startEditing}
                        saveEdit={saveEdit}
                        removeTask={removeTask}
                    />
                ))}
            </ul>
        </div>
    );
};