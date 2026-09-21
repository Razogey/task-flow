export const TaskItem = ({ task, index, changeStatus, startEditing, saveEdit, removeTask }) => {
    return (
        <li className="list-item">
            {task.isEditing ? (
                <input 
                    type="text"
                    defaultValue={task.text}
                    autoFocus
                    onBlur={(e) => saveEdit(index, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            saveEdit(index, e.target.value);
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
                        opacity: task.completed ? 0.6 : 1,
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
    );
};