import React from 'react';
import { Trash2, ListTodo } from 'lucide-react';

export const TaskFooter = ({ 
  tasksCount, 
  currentTab, 
  onTabChange, 
  onClearCompleted 
}) => {
  return (
    <div className="task-footer">
      <div className="task-footer__counter">
        <ListTodo size={16} />
        <span><strong>{tasksCount}</strong> tasks remaining</span>
      </div>

      <div className="task-footer__filters">
        <button 
          className={`filter-btn ${currentTab === 'all' ? 'active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${currentTab === 'active' ? 'active' : ''}`}
          onClick={() => onTabChange('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${currentTab === 'completed' ? 'active' : ''}`}
          onClick={() => onTabChange('completed')}
        >
          Completed
        </button>
      </div>

      <button 
        className="task-footer__clear-btn"
        onClick={onClearCompleted}
      >
        <Trash2 size={15} />
        <span>Clear completed</span>
      </button>
    </div>
  );
};