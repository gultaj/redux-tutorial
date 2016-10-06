import { connect } from 'react-redux';
import { actionToggleTodo } from '../actions';
import { getVisibilityTodos }  from '../utils/functions';
import React, { Component } from 'react';
import { fetchTodos } from '../api/index';

const Todo = ({onClick, completed, text}) => (
	<li className={completed ? 'todo-completed' : ''}
		data-id={1}
		onClick={onClick}>{text}
	</li>
);

@connect(
	(state, {filter}) => ({
		todos: getVisibilityTodos(state, filter),
		filter
	}),
	{ onTodoClick: actionToggleTodo }
)
export default class TodoList extends Component {
	componentDidMount() {
		const { filter } = this.props;
		fetchTodos(filter).then(todos => 
			console.log(filter, todos)
		);
	}
	componentDidUpdate(prevProps) {
		const { filter } = this.props;
		if (filter !== prevProps.filter) {
			fetchTodos(filter).then(todos => 
				console.log(filter, todos)
			);
		}
	}
	render() {
		const {todos, onTodoClick} = this.props;
		return (
			<ul className='todo-list'>
				{todos.map(todo => <Todo key={todo.id} onClick={() => onTodoClick(todo.id) } {...todo} />) }
			</ul>
		);
	}
}