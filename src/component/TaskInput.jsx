export const TaskInput = ({ inputValue, setInputValue, addTask }) => {
    return (
        <div className="task-input-container">
            <input 
                type="text" 
                onChange={(e) => setInputValue(e.target.value)} 
                value={inputValue} 
                placeholder="add new task..."       
                onKeyDown={(e) => { if (e.key === "Enter") addTask() }}        
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};