import { connect } from 'react-redux';
import { actionToggleTodo } from '../actions';
import { getVisibilityTodos }  from '../utils';
import React, { Component } from 'react';

const Todo = ({onClick, completed, text}) => (
	<li className={completed ? 'todo-completed' : ''}
		data-id={1} 
		onClick={onClick}>{text}
	</li>
);

@connect(
	state => ({
		todos: getVisibilityTodos(state.todos, state.visibilityFilter)
	}),
	dispatch => ({
		onTodoClick(id) {
			dispatch(actionToggleTodo(id))
		}
	})
)
export default class TodoList extends Component {
	render() {
		const {todos, onTodoClick} = this.props;
		return (
			<ul className='todo-list'>
				{todos.map((todo, i) => <Todo key={i} onClick={() => onTodoClick(todo.id)} {...todo} />)}
			</ul>
		);
	}
}