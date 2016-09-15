let nextTodoId = 1;

export const actionAddTodo = (text) => ({type: 'ADD_TODO', id: nextTodoId++, text});
export const actionToggleTodo = (id) => ({type: 'TOGGLE_TODO', id});
export const actionVisibilityFilter = (filter) => ({type: 'SET_VISIBILITY_FILTER', filter});