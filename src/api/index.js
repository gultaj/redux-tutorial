import { v4 } from 'node-uuid';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'hey',
            completed: false 
        },
        {
            id: v4(),
            text: 'ho',
            completed: true
        }
    ]
};

export const fetchTodos = (filter) => {
    return delay(5000).then(() => {
        switch (filter) {
            case 'all': return fakeDatabase.todos;
            case 'active' : return fakeDatabase.todos.filter(todo => !todo.completed);
            case 'completed' : return fakeDatabase.todos.filter(todo => todo.completed);
            default: 
                throw new Error(`Unknown filter: `);
        }
    });
};