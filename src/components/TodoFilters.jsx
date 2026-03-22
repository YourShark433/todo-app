function TodoFilters({ filter, onFilterChange, activeCount, isDarkTheme }) {
    const getButtonStyle = (filterType) => ({
        margin: '0 5px',
        padding: '5px 10px',
        background: filter === filterType 
            ? (isDarkTheme ? '#bb86fc' : '#007bff') 
            : (isDarkTheme ? '#444' : '#f0f0f0'),
        color: filter === filterType 
            ? 'white' 
            : (isDarkTheme ? '#ddd' : '#333'),
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    });

    const getFilterLabel = (filterType) => {
        if (filterType === 'all') return 'Все';
        if (filterType === 'active') return 'Активные';
        return 'Выполненные';
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: `2px solid ${isDarkTheme ? '#444' : '#eee'}`
        }}>
            <span>Осталось задач: {activeCount}</span>
            <div>
                {['all', 'active', 'completed'].map((filterType) => (
                    <button
                        key={filterType}
                        onClick={() => onFilterChange(filterType)}
                        style={getButtonStyle(filterType)}
                    >
                        {getFilterLabel(filterType)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoFilters;