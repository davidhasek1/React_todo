import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import List from './Components/List';
import Counter from './Components/Counter';
import Search from './Components/Search';

const App = (props) => {
	const [ inputArray, setInputArray ] = useState([]);
	const [ counter, setCounter ] = useState(0);

	//...addto list handler funkce
	const addToList = async (inputData) => {
		try {
			const api = await fetch('http://localhost:8080/post-todo', {
				method: 'POST',
				body: JSON.stringify(inputData), //parametr fce -  to co jde z form.js tedy input určen k uložení do ple resp. do DB
				headers: {
					'Content-Type': 'application/json'
				}
			});
			await api.json();
			setInputArray((prevInput) => [ { ...inputData }, ...prevInput ]);
			setCounter(1 + counter);
			console.log(counter);
		} catch (error) {
			console.warn('fail to fetch backend');
		}
	};
	const deleteTodo = async (id) => {
		console.log(id);
		try {
			const api = await fetch('http://localhost:8080/delete-todo/' + id, {
				method: 'DELETE'
			}); //post body s id
			/* const data = */ await api.json();
			setInputArray((prevInput) => {
				prevInput.filter((input) => input._id !== id);
			}); //set updated data
			setCounter(counter - 1);
		} catch (error) {
			console.log(error);
		}
	};

	const filteredTodosHandler = useCallback((filteredTodos, count) => {
		console.log(count);
		setInputArray(filteredTodos);
		setCounter(count);
	}, []);
	

	// JAk použít async await , když use effect nemuže pobrat async????
	
	useEffect(
		() => {
			console.log('test fetch');
		},
		[ inputArray ]
	); //tento useEffect proběhne pouze, když se změní stav input array - když definuju inputArray do dependencies

	
	let listData = inputArray.map((data, idx) => {
		//použít index je nahovno ale id math random hazej chybu při submitu jednoho inputu 2x
		return (
			<List
				key={data.id}
				title={data.title}
				deleteItem={() => {
					deleteTodo(data.id);
				}}
			/>
		);
	});

	//addTodo bude přidatvat tady item do pole^
	return (
		<div className="App">
			<Header />
			<Form addTodo={addToList} />
			<Counter taskCount={counter} />
			<Search onLoadTodos={filteredTodosHandler}/>
			<h2 className="list-heading">Todos</h2>
			<ul>{listData}</ul>
		</div>
	);
};

export default App;
