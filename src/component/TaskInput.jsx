import { Plus } from 'lucide-react';

export const TaskInput = ({ inputValue, setInputValue, addTask }) => {
    return (
        <div className="task-input-container">
            <div className="task-input-field">
                <span className="task-input-icon" aria-hidden="true">
                    <Plus size={16} strokeWidth={3} />
                </span>
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="Add a new task..."
                    onKeyDown={(e) => { if (e.key === "Enter") addTask() }}
                />
            </div>
            <button onClick={addTask}>Add</button>
        </div>
    );
};