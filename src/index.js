import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
//import App from './App';

if (module.hot) module.hot.accept();

const initialState = {
	todos: [{
		id: '0',
		text: 'Learn Redux',
		completed: false
	}],
	visibilityFilter: undefined
};

const getVisibilityTodos = (todos, filter) => {
	switch(filter) {
		case 'SHOW_ALL': return todos;
		case 'SHOW_ACTIVE' : return todos.filter(todo => !todo.completed);
		case 'SHOW_COMPLETED' : return todos.filter(todo => todo.completed);
		default: return todos;
	}
}
let nextTodoId = 1;

const actionAddTodo = (text) => ({type: 'ADD_TODO', id: nextTodoId++, text});
const actionToggleTodo = (id) => ({type: 'TOGGLE_TODO', id});
const actionVisibilityFilter = (filter) => ({type: 'SET_VISIBILITY_FILTER', filter});

const todo = (state, action) => {
	switch(action.type) {
		case 'ADD_TODO': return {
			id: action.id,
			text: action.text,
			completed: false
		};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) return state;
			return { ...state, completed: !state.completed};
	}
};
const todos = (state = [], action) => {
	switch(action.type) {
		case 'ADD_TODO': return [...state, todo(undefined, action)];
		case 'TOGGLE_TODO': return state.map(t => todo(t, action));
		default: return state;
	};
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER': return action.filter;
		default: return state
	}
};

const Link = ({active, children, onClick}) => {
	if (active) {
		return <span>{children}</span>
	}
	return (
		<a href='#' onClick={e => {
			e.preventDefault();
			onClick();
		}}>{children}</a>
	);
};

const FilterLink = connect(
	(state, ownProps) => ({
		active: ownProps.filter === state.visibilityFilter
	}),
	(dispatch, ownProps) => ({
		onClick() {
			dispatch(actionVisibilityFilter(ownProps.filter));
		}
	})
)(Link);

const Footer = () => (
	<p>
		Show:{' '}
		<FilterLink filter='SHOW_ALL'>All</FilterLink>{' '}
		<FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>{' '}
		<FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
	</p>
);

const TodoApp = () => (
	<div>
		<h1>To-Do</h1>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
);

let AddTodo = ({dispatch}) => {
	let input;
	return (
		<div>
			<input type='text' ref={node => input = node} />
			<button onClick={() => {
				dispatch(actionAddTodo(input.value));
				input.value = '';
			}}>Add</button>
		</div>
	);
};

AddTodo = connect()(AddTodo);

const Todo = ({onClick, completed, text}) => (
	<li className={completed ? 'todo-completed' : ''}
		data-id={1} 
		onClick={onClick}>{text}
	</li>
);

const TodoList = ({todos, onTodoClick}) => (
	<ul className='todo-list'>
		{todos.map((todo, i) => <Todo key={i} onClick={() => onTodoClick(todo.id)} {...todo} />)}
	</ul>
);

const VisibleTodoList = connect(
	state => ({
		todos: getVisibilityTodos(state.todos, state.visibilityFilter)
	}),
	dispatch => ({
		onTodoClick(id) {
			dispatch(actionToggleTodo(id))
		}
	})
)(TodoList);

const todoApp = combineReducers({todos, visibilityFilter});
const store = createStore(todoApp, initialState);

render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
document.getElementById('root'));