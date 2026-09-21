import React from 'react';
import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};