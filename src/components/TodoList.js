import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibilityTodos }  from '../utils/functions';
import React, { Component } from 'react';

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
		const { filter, fetchTodos } = this.props;
		fetchTodos(filter);
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
		const {todos, actions} = this.props;
		return (
			<ul className='todo-list'>
				{todos.map(todo => <Todo key={todo.id} onClick={() => actions.toggleTodo(todo.id) } {...todo} />) }
			</ul>
		);
	}
}