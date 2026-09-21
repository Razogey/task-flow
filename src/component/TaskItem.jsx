export const TaskItem = ({ task, id, changeStatus, startEditing, saveEdit, removeTask }) => {
    return (
        <li className="list-item">
            {task.isEditing ? (
                <input 
                    type="text"
                    defaultValue={task.text}
                    autoFocus
                    onBlur={(e) => saveEdit(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            saveEdit(e.target.value);
                        }
                    }}
                />
            ) : (
                <span 
                    onDoubleClick={() => startEditing(id)}
                    onClick={() => changeStatus(id)}
                    style={{ 
                        textDecoration: task.completed ? "line-through" : "none",
                        cursor: "pointer",
                        opacity: task.completed ? 0.6 : 1,
                        color: task.completed ? "#ff0000" : "#6b6375"
                    }}
                    title="Double click to edit"
                >
                    {task.text}  
                </span>
            )}

            <div className="task-actions">
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => changeStatus(id)} 
                />

                <button className="remove-btn" onClick={() => removeTask(id)}>Remove</button>
            </div>
        </li>
    );
};