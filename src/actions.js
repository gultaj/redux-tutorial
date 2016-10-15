import { v4 } from 'node-uuid';
import * as api from './api';
import { getIsFetching } from './utils/functions';

export const actionAddTodo = (text) => (dispatch) => (
    api.addTodo(text).then(response => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response
        });
    })
);

export const toggleTodo = (id) => (dispatch) => (
    api.toggleTodo(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response
        });
    })
);

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });
    return api.fetchTodos(filter).then(
        response => { 
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response
            });
        },
        error => {
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message: error.message || 'Something went wrong!'
            });
        }
    );
};
