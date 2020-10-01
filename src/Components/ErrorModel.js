import React from 'react';

const ErrorModel = (props) => {
	return (
		<React.Fragment>
			<div className="backdrop" onClick={props.onClose} />
			<div className="errorPopUp">
				<h2>An Error Occured</h2>
				<p>{props.children}</p>
                <button onClick={props.onClose}>Close</button>
			</div>
		</React.Fragment>
	);
};

export default ErrorModel;
