import { CheckCheck } from 'lucide-react';

export const SideBar = ({ activeFilter, setActiveFilter, counts, isOpen, onToggle }) => {
    const navigations = ["today", "upcoming", "completed", "all"]
    const categories = ["Work", "Personal", "Health", "Study"]

    return (
        <>
            <div className={`sidebar-container ${isOpen ? 'is-open' : 'is-closed'}`}>
                <aside className="sidebar" aria-hidden={!isOpen}>
                <div className="sidebar-brand">
                    <div className="brand-logo">
                        <CheckCheck size={18} color="#fff" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2>Task Flow</h2>
                        <p className="brand-tagline">Small steps. Big goals.</p>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    {navigations.map((navigationItem) => {
                        return (
                            <button
                                key={navigationItem}
                                className={`nav-item ${activeFilter === navigationItem ? 'active' : ''}`}
                                onClick={() => setActiveFilter(navigationItem)}
                            >
                                <span className="nav-label" style={{ textTransform: 'capitalize' }}>
                                    {navigationItem}
                                </span>
                                <span className="counter">
                                    {counts ? counts[navigationItem] : 0}
                                </span>
                            </button>
                        )
                    })}
                </nav>
                <div className="sidebar-categories">
                    <h4>Categories</h4>
                    {categories.map((category) => {
                        return (
                            <div
                                key={category}
                                className={`category-item ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                <span className={`dot ${category.toLowerCase()}`}></span>
                                {category}
                                <span className="counter">
                                    {counts ? counts[category.toLowerCase()] : 0}
                                </span>
                            </div>
                        )
                    })}
                </div>
                </aside>
            </div>
            {isOpen && <button className="sidebar-backdrop" type="button" onClick={onToggle} aria-label="Close sidebar" />}
        </>
    )
}