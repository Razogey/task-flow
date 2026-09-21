import "./ToDo/todo.css"

export const SideBar = ({ activeFilter, setActiveFilter, counts }) => {
    const navigations = ["today", "upcoming", "completed", "all"]
    const categories = ["Work", "Personal", "Health", "Study"] // تم تصحيح كتابة Health

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo"></div>
                <div>
                    <h2>Task Flow</h2>
                    <p className="brand-tagline">
                        Small steps. Big goals.
                    </p>
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
    )
}