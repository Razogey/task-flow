import { useEffect, useState } from "react";
import { TaskInput } from "../TaskInput";
import { TaskList } from "../TaskList"; 
import { SideBar } from "../Sidebar";
import { Header } from "../Header";
import { TaskFooter } from "../TaskFooter";
import "./todo.css";

export const ToDo = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([
        {id: 1, text: "Study Django REST Framework", completed: false, isEditing: false, category: "Study", list: "today", createdAt: "2026-09-18T09:00:00.000Z"},
        {id: 2, text: "Gym workout session", completed: true, isEditing: false, category: "Health", list: "today", createdAt: "2026-09-19T07:30:00.000Z"}
    ]);
    
    const [activeFilter, setActiveFilter] = useState("today");
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
    const [searchQuery, setSearchQuery] = useState("");
    const [footerTab, setFooterTab] = useState('all');
    const activeTasksCount = tasks.filter(t => !t.completed).length;    

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const clearCompletedTasks = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

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
        let matchesSidebar = true;
        if (activeFilter === 'today') matchesSidebar = task.list === 'today';
        else if (activeFilter === 'upcoming') matchesSidebar = task.list === 'upcoming';
        else if (activeFilter === 'completed') matchesSidebar = task.completed;
        else if (activeFilter !== 'all') matchesSidebar = task.category === activeFilter;

        let matchesFooterTab = true;
        if (footerTab === 'active') matchesFooterTab = !task.completed;
        else if (footerTab === 'completed') matchesFooterTab = task.completed;
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSidebar && matchesFooterTab && matchesSearch;
    });

    const addTask = () => {
        if (inputValue.trim() === "") return;
        setTasks([...tasks, {
            id: Date.now(), 
            text: inputValue, 
            completed: false, 
            isEditing: false, 
            category: "Personal", 
            list: "today",
            createdAt: new Date().toISOString()
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
        setTasks(tasks.map(task => ({
            ...task,
            isEditing: task.id === id
        })));
    };

    const cancelEdit = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isEditing: false } : task
        ));
    };

    const saveEdit = (id, newText) => {
        if (newText.trim() === "") {
            cancelEdit(id);
            return;
        }
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText.trim(), isEditing: false };
            }
            return task;
        }));
    };

    return (
        <div className="app-shell">
            <SideBar 
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                counts={counts}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
            />
            <div className="main-content-area">
                <Header 
                    userName="Abdelrazzag Abdalla"
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
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
                        onCancelEdit={cancelEdit}
                        onDelete={removeTask}
                    />
                    <TaskFooter 
                        tasksCount={activeTasksCount}
                        currentTab={footerTab}
                        onTabChange={setFooterTab}
                        onClearCompleted={clearCompletedTasks}
                    />
                </div>
            </div>
        </div>
    );
};