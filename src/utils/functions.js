
export const getVisibilityTodos = (state, filter) => {
	const ids = state.idsByFilter[filter];
	return ids.map(id => state.byId[id]);
};