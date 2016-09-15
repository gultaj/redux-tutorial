import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
	<Link to={filter === 'all' ? '' : filter} activeClassName='active'>
		{children}
	</Link>
);

const Footer = () => (
	<p>
		Show:{' '}
		<FilterLink filter='all'>All</FilterLink>{' '}
		<FilterLink filter='active'>Active</FilterLink>{' '}
		<FilterLink filter='completed'>Completed</FilterLink>
	</p>
);

export default Footer;