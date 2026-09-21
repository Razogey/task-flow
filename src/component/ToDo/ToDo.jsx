import { useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskItem } from "../TaskItem";
import { SideBar } from "../Sidebar";
import "./todo.css";

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([
        {id: 1, text: "Study Django REST Framework", completed: false, isEditing: false, category: "Study", list: "today"},
        {id: 2, text: "Gym workout session", completed: true, isEditing: false, category: "Health", list: "today"}
    ]);
    
    const [activeFilter, setActiveFilter] = useState("today");

    const counts = {
        today: tasks.filter(t => t.list === 'today' && !t.completed).length,
        upcoming: tasks.filter(t => t.list === 'upcoming' && !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        all: tasks.length,
        work: tasks.filter(t => t.category === 'Work' && !t.completed).length,
        personal: tasks.filter(t => t.category === 'Personal' && !t.completed).length,
        health: tasks.filter(t => t.category === 'Health' && !t.completed).length,
        study: tasks.filter(t => t.category === 'Study' && !t.completed).length,
    };

    // استخدام القائمة المفلطرة بناءً على الفلتر النشط
    const filteredTasks = tasks.filter(task => {
        if (activeFilter === 'today') return task.list === 'today';
        if (activeFilter === 'upcoming') return task.list === 'upcoming';
        if (activeFilter === 'completed') return task.completed;
        if (activeFilter === 'all') return true;
        return task.category === activeFilter;
    });

    const addTask = () => {
        if (inputValue.trim() === "") return;
        setTasks([...tasks, {
            id: Date.now(), 
            text: inputValue, 
            completed: false, 
            isEditing: false, 
            category: "Personal", 
            list: "today"
        }]);
        setInputValue("");
    };

    // التعديل هنا: الاعتماد على الـ id بدلاً من الـ index
    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const changeStatus = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            }
            return task;
        }));
    };

    const startEditing = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, isEditing: true };
            }
            return task;
        }));
    };

    const saveEdit = (id, newText) => {
        if (newText.trim() === "") return;
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText, isEditing: false };
            }
            return task;
        }));
    };

    return (
        <div className="app-shell" style={{ display: "flex", gap: "24px" }}>
            <SideBar 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                counts={counts}
            />
            <div className="todo-main">
                <h3>To Do List: <span style={{ textTransform: 'capitalize' }}>{activeFilter}</span></h3>
                
                <TaskInput 
                    inputValue={inputValue} 
                    setInputValue={setInputValue} 
                    addTask={addTask} 
                />

                <br />
                
                <ul className="list">
                    {/* استخدام filteredTasks وعمل الـ Arrow Functions للدوال */}
                    {filteredTasks?.map((task) => (
                        <TaskItem 
                            key={task.id}
                            task={task}
                            index={task.id}
                            changeStatus={() => changeStatus(task.id)}
                            startEditing={() => startEditing(task.id)}
                            saveEdit={(newText) => saveEdit(task.id, newText)}
                            removeTask={() => removeTask(task.id)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};