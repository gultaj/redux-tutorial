import { getById, getIds } from '../reducers';

export const getVisibilityTodos = (state, filter) => {
	const ids = getIds(state.listByFilter[filter]);
	return ids.map(id => getById(state.byId, id));
};