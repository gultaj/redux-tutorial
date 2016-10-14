import * as helpers from '../reducers';

export const getVisibilityTodos = (state, filter) => {
	const ids = helpers.getIds(state.listByFilter[filter]);
	return ids.map(id => helpers.getById(state.byId, id));
};

export const getIsFetching = (state, filter) => 
	helpers.getIsFetching(state.listByFilter[filter]);