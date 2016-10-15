import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
	if (action.response) {
		return {
			...state, ...action.response.entities.todos
		};
	}
	return state;
};

const createList = (filter) => {
	const ids = (state = [], action) => {
		switch (action.type) {
			case 'FETCH_TODOS_SUCCESS': 
				return action.filter == filter ? action.response.result : state;
			case 'ADD_TODO_SUCCESS':
				return filter !== 'completed' ?
					[...state, action.response.result] :
					state;
			default: return state;
		}
	};

	const isFetching = (state = false, action) => {
		if (action.filter !== filter) return state;
		switch (action.type) {
			case 'FETCH_TODOS_REQUEST': return true;
			case 'FETCH_TODOS_SUCCESS':
			case 'FETCH_TODOS_FAILURE': 
				return false;
			default: return state;
		}
	};

	const errorMessage = (state = null, action) => {
		if (action.filter !== filter) return state;
		switch (action.type) {
			case 'FETCH_TODOS_FAILURE': return action.message;
			case 'FETCH_TODOS_SUCCESS':
			case 'FETCH_TODOS_REQUEST': 
				return null;
			default: return state;
		}
	}	

	return combineReducers({
		ids, isFetching, errorMessage
	});
};

const listByFilter = combineReducers({
	'all': createList('all'),
	'active': createList('active'),
	'completed': createList('completed')
});

const todos = combineReducers({
	byId,
	listByFilter
});
export default todos;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getById = (state, id) => state[id];
export const getErrorMessage = (state, id) => state.errorMessage;