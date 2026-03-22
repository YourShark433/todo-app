import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
    // Состояние для темы (true - темная, false - светлая)
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Состояние для списка задач
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    // Состояние для текущего фильтра
    const [filter, setFilter] = useState('all');

    // Сохраняем задачи и тему в localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    // --- Функции управления задачами ---
    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    // Фильтрация задач
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;

    // --- Стили в зависимости от темы ---
    const themeStyles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
            color: isDarkTheme ? '#e0e0e0' : '#333333',
            minHeight: '100vh',
            transition: 'all 0.3s ease'
        },
        header: {
            textAlign: 'center',
            color: isDarkTheme ? '#bb86fc' : '#333',
            marginBottom: '20px'
        },
        clearButton: {
            marginTop: '20px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
        },
        themeButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 16px',
            background: isDarkTheme ? '#bb86fc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    };

    // --- Вспомогательные стили для списка ---
    const ulStyle = {
        listStyle: 'none',
        padding: 0,
        backgroundColor: isDarkTheme ? '#2d2d2d' : 'transparent',
        borderRadius: '8px'
    };

    return (
        <div style={themeStyles.container}>
            <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                style={themeStyles.themeButton}
            >
                {isDarkTheme ? 'Светлая тема' : 'Тёмная тема'}
            </button>

            <h1 style={themeStyles.header}>Менеджер задач</h1>

            <AddTodoForm onAdd={addTodo} />
            <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                isDarkTheme={isDarkTheme}
            />

            {filteredTodos.length === 0 ? (
                <p style={{ textAlign: 'center', color: isDarkTheme ? '#aaa' : '#999' }}>
                    {filter === 'all' ? 'Задач пока нет' :
                     filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
                </p>
            ) : (
                <ul style={ulStyle}>
                    {filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            task={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                        />
                    ))}
                </ul>
            )}

            {todos.length > 0 && (
                <button onClick={() => setTodos([])} style={themeStyles.clearButton}>
                    Очистить всё
                </button>
            )}
        </div>
    );
}

export default App;