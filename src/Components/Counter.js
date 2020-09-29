import React from 'react';
import './Counter.css';

const Counter = (props) => {
	return (
		<div className="Counter">
			<p>
				Tasks to do: <strong>{props.taskCount}</strong>
			</p>
		</div>
	);
};

export default Counter;
