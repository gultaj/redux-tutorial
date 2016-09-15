import { connect } from 'react-redux';
import { actionVisibilityFilter } from '../actions';
import React, { Component } from 'react';

@connect(
	(state, ownProps) => ({
		active: ownProps.filter === state.visibilityFilter
	}),
	(dispatch, ownProps) => ({
		onClick() {
			dispatch(actionVisibilityFilter(ownProps.filter));
		}
	})
)
class FilterLink extends Component {
	render() {
		const {active, children, onClick} = this.props;
		if (active) {
			return <span>{children}</span>
		}
		return (
			<a href='#' onClick={e => {
				e.preventDefault();
				onClick();
			}}>{children}</a>
		);
	}
}

const Footer = () => (
	<p>
		Show:{' '}
		<FilterLink filter='SHOW_ALL'>All</FilterLink>{' '}
		<FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>{' '}
		<FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
	</p>
);

export default Footer;