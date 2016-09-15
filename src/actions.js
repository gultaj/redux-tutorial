import { v4 } from 'node-uuid';

export const actionAddTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const actionToggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

export const actionVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});