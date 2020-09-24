import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';

const App = (props) => {
	
	const [inputArray, setInputArray] = useState([]);

	//...addto list handler funkce
	const addToList = inputData => {
		setInputArray(prevInput => [inputData, ...prevInput]);
		//console.log(inputArray);
	}

	let inp = inputArray.map(data => {
		return (
		<li>{data}</li>
		)
	})

	//addTodo bude přidatvat tady item do pole^
	return (
		<div className="App">
			<Header />
			<Form addTodo={addToList}/>

			{inp}
		</div>
	);
};

export default App;

//componenta input
//componenta list
