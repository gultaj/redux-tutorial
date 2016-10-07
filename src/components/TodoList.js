import { connect } from 'react-redux';
import * as actions from '../actions';
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
	(state, {filter = 'all'}) => ({
		todos: getVisibilityTodos(state, filter),
		filter
	}),
	actions
)
export default class TodoList extends Component {
	fetchData() {
		const { filter, receiveTodos } = this.props;
		fetchTodos(filter).then(todos => 
			receiveTodos(filter, todos)
		);
	}
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}
	render() {
		const {todos, toggleTodo} = this.props;
		return (
			<ul className='todo-list'>
				{todos.map(todo => <Todo key={todo.id} onClick={() => toggleTodo(todo.id) } {...todo} />) }
			</ul>
		);
	}
}