import { v4 } from 'node-uuid';
import * as api from './api';
import { getIsFetching } from './utils/functions';

export const actionAddTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => { 
        dispatch(receiveTodos(filter, response));
    });
};

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});
