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
    return delay(500).then(() => {
        // if (Math.random() > 0.5) {
        //     throw new Error('Boom!');
        // }
        switch (filter) {
            case 'all': return fakeDatabase.todos;
            case 'active' : return fakeDatabase.todos.filter(todo => !todo.completed);
            case 'completed' : return fakeDatabase.todos.filter(todo => todo.completed);
            default: 
                throw new Error(`Unknown filter: `);
        }
    });
};

export const addTodo = (text) => {
    return delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false 
        };
        fakeDatabase.todos.push(todo);
        return todo;
    });
};

export const toggleTodo = (id) => {
    return delay(500).then(() => {
        const todo = fakeDatabase.todos.find(t => t.id == id);
        todo.completed = !todo.completed;
        return todo;
    });
};