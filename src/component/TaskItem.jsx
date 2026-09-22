import { useState } from "react";
import { Calendar } from 'lucide-react';

function formatDateAdded(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (isNaN(d)) return null;
    const now = new Date();
    const sameDay =
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate();
    if (sameDay) return "Today";
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const TaskItem = ({ task, id, changeStatus, startEditing, saveEdit, cancelEdit, removeTask, animationDelay = 0 }) => {
    const [draft, setDraft] = useState(task.text);

    const commit = () => {
        const trimmed = draft.trim();
        if (trimmed === "") {
            cancelEdit(id);
            return;
        }
        saveEdit(id, trimmed);
    };

    const dateLabel = formatDateAdded(task.createdAt);

    return (
        <li
            className={`list-item ${task.isEditing ? "is-editing" : ""}`}
            style={{ "--task-delay": `${animationDelay}ms` }}
        >
            <div className="list-item__main">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => changeStatus(id)}
                        aria-label={`Mark "${task.text}" as ${task.completed ? "not completed" : "completed"}`}
                    />
                    <span className="checkbox__box">
                        <svg viewBox="0 0 16 16" width="11" height="11" fill="none" aria-hidden="true">
                            <path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </label>

                <div className="task-content">
                    {task.isEditing ? (
                        <div className="edit-row">
                            <input
                                type="text"
                                value={draft}
                                autoFocus
                                onChange={(e) => setDraft(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") commit();
                                    if (e.key === "Escape") cancelEdit(id);
                                }}
                            />
                            <button type="button" className="cancel-btn" onClick={() => cancelEdit(id)}>
                                Cancel
                            </button>
                            <button type="button" className="save-btn" onClick={commit}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <span
                                onDoubleClick={() => startEditing(id)}
                                className={`task-text ${task.completed ? "completed" : ""}`}
                                title="Double click to edit"
                            >
                                {task.text}
                            </span>
                            <div className="task-meta">
                                <span className={`category-badge ${task.category ? task.category.toLowerCase() : ""}`}>
                                    {task.category}
                                </span>
                                {dateLabel && (
                                    <span className="task-date">
                                        <Calendar size={12} />
                                        {dateLabel}
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {!task.isEditing && (
                <div className="task-actions">
                    <button type="button" className="remove-btn" onClick={() => removeTask(id)}>
                        Remove
                    </button>
                </div>
            )}
        </li>
    );
};