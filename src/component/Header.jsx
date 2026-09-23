import React from 'react';
import { Bell, CheckCheck, Menu, Search, X } from 'lucide-react';

export const Header = ({ userName = "Rizga", searchQuery, onSearchChange, isSidebarOpen, onSidebarToggle }) => {
  return (
    <header className="app-header">
      <div className="header__greeting-group">
        <button
          className={`sidebar-toggle ${isSidebarOpen ? 'is-open' : 'is-closed'}`}
          type="button"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={20} strokeWidth={2.25} /> : <Menu size={20} strokeWidth={2.25} />}
        </button>

        {/* Compact brand: the sidebar owns the "Task Flow" identity while
            it's open. The instant it's closed/collapsed, this fades and
            slides into view so the app identity is never lost. */}
        <div
          className={`header__brand ${isSidebarOpen ? 'is-hidden' : 'is-visible'}`}
          aria-hidden={isSidebarOpen}
        >
          <span className="header__brand-logo">
            <CheckCheck size={16} color="#fff" strokeWidth={2.5} />
          </span>
          <span className="header__brand-name">Task Flow</span>
        </div>

        <div className="header__greeting">
        <h2>
          Good morning, <span className="user-name">{userName}</span> 
          
        </h2>
        </div>
      </div>

      <div className="header__search-container">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input"
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="header__actions">
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={18} color="#3F3A56" />
          <span className="notification-badge"></span>
        </button>

        <div className="user-avatar">
          <span>{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
        </div>
      </div>
    </header>
  );
};