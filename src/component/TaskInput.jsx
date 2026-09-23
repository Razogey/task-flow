export const TaskInput = ({ inputValue, setInputValue, addTask }) => {
    return (
        <div className="task-input-container">
            <div className="task-input-field">
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="Add a new task..."
                    onKeyDown={(e) => { if (e.key === "Enter") addTask() }}
                />
            </div>
            <button type="button" onClick={addTask}>Add</button>
        </div>
    );
};