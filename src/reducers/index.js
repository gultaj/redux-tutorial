import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_TODOS':
			const nextState = {...state};
			action.response.forEach(todo => nextState[todo.id] = todo);
			return nextState;
		default:
			return state;
	}
};

const createList = (filter) => (state = [], action) => {
	if (action.filter !== filter) return state;
	switch (action.type) {
		case 'RECEIVE_TODOS': return action.response.map(todo => todo.id);
		default: return state;
	}
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

export const getIds = (state) => state;
export const getById = (state, id) => state[id];