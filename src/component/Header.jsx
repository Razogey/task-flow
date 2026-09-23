import React, { useEffect, useRef } from 'react';
import { Bell, CheckCheck, Menu, Search, X, Sun, Moon } from 'lucide-react';

export const Header = ({
  userName = "Rizga",
  searchQuery,
  onSearchChange,
  isSidebarOpen,
  onSidebarToggle,
  isDarkMode,
  onToggleDarkMode,
  isSearchOpen,
  onSearchToggle,
  onSearchClose
}) => {
  const searchContainerRef = useRef(null);
  const hour = new Date().getHours();
  const greeting =
    hour >= 5 && hour < 12 ? "Good morning," :
    hour >= 12 && hour < 17 ? "Good afternoon," :
    "Good evening,";

  useEffect(() => {
    if (!isSearchOpen) return;

    const handlePointerDown = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        onSearchClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onSearchClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, onSearchClose]);

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
            {greeting} <span className="user-name">{userName}</span>
          </h2>
        </div>
      </div>

      <div ref={searchContainerRef} className={`header__search-container ${isSearchOpen ? 'is-open' : 'is-collapsed'}`}>
        <button
          type="button"
          className="search-toggle"
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          aria-expanded={isSearchOpen}
          onClick={() => {
            if (isSearchOpen) {
              onSearchClose();
              return;
            }
            onSearchToggle();
          }}
        >
          <Search size={18} />
        </button>

        <div className="search-field-wrap">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onBlur={() => {
              if (!searchQuery.trim()) onSearchClose();
            }}
          />
        </div>
      </div>

      <div className="header__actions">
        <button
          type="button"
          className={`theme-toggle ${isDarkMode ? 'is-dark' : 'is-light'}`}
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={isDarkMode}
        >
          <span className="theme-toggle__track">
            <span className="theme-toggle__thumb">
              <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={13} strokeWidth={2.5} />
              <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={13} strokeWidth={2.5} />
            </span>
          </span>
        </button>

        <button className="notification-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge"></span>
        </button>

        <div className="user-avatar">
          <span>{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
        </div>
      </div>
    </header>
  );
};