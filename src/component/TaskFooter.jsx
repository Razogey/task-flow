import { useLayoutEffect, useRef, useState } from 'react';
import { Trash2, ListTodo } from 'lucide-react';

export const TaskFooter = ({ 
  tasksCount, 
  currentTab, 
  onTabChange, 
  onClearCompleted 
}) => {
  const filtersRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, offset: 0 });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = filtersRef.current;
      const button = buttonRefs.current[currentTab];

      if (!container || !button) return;

      setIndicatorStyle({
        width: button.offsetWidth,
        offset: button.offsetLeft,
      });
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    if (filtersRef.current) resizeObserver.observe(filtersRef.current);

    return () => resizeObserver.disconnect();
  }, [currentTab]);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="task-footer">
      <div className="task-footer__counter">
        <ListTodo size={16} />
        <span><strong>{tasksCount}</strong> tasks remaining</span>
      </div>

      <div className="task-footer__filters" ref={filtersRef}>
        <span
          className="filter-slider-indicator"
          aria-hidden="true"
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.offset}px)`,
          }}
        />
        {filterOptions.map(({ value, label }) => (
          <button
            key={value}
            ref={(button) => {
              buttonRefs.current[value] = button;
            }}
            className={`filter-btn ${currentTab === value ? 'active' : ''}`}
            onClick={() => onTabChange(value)}
          >
            {label}
          </button>
        ))}
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