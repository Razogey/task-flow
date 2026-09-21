import { useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskList } from "../TaskList"; 
import { SideBar } from "../Sidebar";
import { Header } from "../Header";
import "./todo.css";

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([
        {id: 1, text: "Study Django REST Framework", completed: false, isEditing: false, category: "Study", list: "today"},
        {id: 2, text: "Gym workout session", completed: true, isEditing: false, category: "Health", list: "today"}
    ]);
    
    const [activeFilter, setActiveFilter] = useState("today");
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredTasks = tasks.filter(task => {
        let matchesFilter = true;
        if (activeFilter === 'today') matchesFilter = task.list === 'today';
        else if (activeFilter === 'upcoming') matchesFilter = task.list === 'upcoming';
        else if (activeFilter === 'completed') matchesFilter = task.completed;
        else if (activeFilter === 'all') matchesFilter = true;
        else matchesFilter = task.category === activeFilter;

        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
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
        <div className="app-shell">
            {/* 1. الشريط الجانبي */}
            <SideBar 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                counts={counts}
            />

            {/* 2. منطقة المحتوى (تضم الهيدر وبطاقة المهام تحت بعضهما البعض بجانب السايدبار) */}
            <div className="main-content-area">
                <Header 
                    userName="Abdelrazzag Abdalla"
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <div className="todo-main">
                    <h3>To Do List: <span style={{ textTransform: 'capitalize' }}>{activeFilter}</span></h3>
                    
                    <TaskInput 
                        inputValue={inputValue} 
                        setInputValue={setInputValue} 
                        addTask={addTask} 
                    />

                    <br />
                    
                    <TaskList 
                        tasks={filteredTasks}
                        onToggle={changeStatus}
                        onEdit={startEditing}
                        onSaveEdit={saveEdit}
                        onDelete={removeTask}
                    />
                </div>
            </div>
        </div>
    );
};