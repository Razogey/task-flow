import { useEffect, useRef, useState } from "react";
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
    const [isRemoving, setIsRemoving] = useState(false);
    const taskItemRef = useRef(null);

    useEffect(() => {
        if (!task.isEditing) return;

        const handlePointerDown = (event) => {
            if (taskItemRef.current && !taskItemRef.current.contains(event.target)) {
                cancelEdit(id);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                cancelEdit(id);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [task.isEditing, id, cancelEdit]);

    const commit = () => {
        const trimmed = draft.trim();
        if (trimmed === "") {
            cancelEdit(id);
            return;
        }
        saveEdit(id, trimmed);
    };

    const dateLabel = formatDateAdded(task.createdAt);
    const handleRemove = () => {
        if (!isRemoving) {
            setIsRemoving(true);
        }
    };

    return (
        <li
            ref={taskItemRef}
            className={`list-item ${task.isEditing ? "is-editing" : ""} ${isRemoving ? "is-removing" : ""}`}
            style={{ "--task-delay": `${animationDelay}ms` }}
            onAnimationEnd={() => {
                if (isRemoving) {
                    removeTask(id);
                }
            }}
            onClick={(event) => {
                if (event.target.closest('.remove-btn') || event.target.closest('.cancel-btn') || event.target.closest('.save-btn') || task.isEditing) {
                    return;
                }
                changeStatus(id);
            }}
        >
            <div className="list-item__main">
                <label className="checkbox" onClick={(event) => event.stopPropagation()}>
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
                        <div className="edit-row" onClick={(event) => event.stopPropagation()}>
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
                <div className="task-actions" onClick={(event) => event.stopPropagation()}>
                    <button type="button" className="remove-btn" onClick={handleRemove} disabled={isRemoving}>
                        Remove
                    </button>
                </div>
            )}
        </li>
    );
};