const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibilityTodos = (state, filter) => {
	const allTodos = getAllTodos(state.todos);
	switch (filter) {
		case 'all': return allTodos;
		case 'active' : return allTodos.filter(todo => !todo.completed);
		case 'completed' : return allTodos.filter(todo => todo.completed);
		default: 
			throw new Error(`Unknown filter: ${filter}`);
	}
}