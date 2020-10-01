import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import List from './Components/List';
import Counter from './Components/Counter';
import Search from './Components/Search';
import ErrorModel from './Components/ErrorModel';

const App = (props) => {
	const [ inputArray, setInputArray ] = useState([]);
	const [ counter, setCounter ] = useState(0);
	const [ isLoading, setIsLoading ] = useState(false); //když isloading bude true tak se vypíše spinner ez

	const [ error, setError ] = useState();

	//...addto list handler funkce
	const addToList = async (inputData) => {
		setIsLoading(true);
		try {
			const api = await fetch('http://localhost:8080/post-todo', {
				method: 'POST',
				body: JSON.stringify(inputData), //parametr fce -  to co jde z form.js tedy input určen k uložení do ple resp. do DB
				headers: {
					'Content-Type': 'application/json'
				}
			});
			await api.json();
			setIsLoading(false);
			setInputArray((prevInput) => [ { ...inputData }, ...prevInput ]);
			setCounter(1 + counter);
			console.log(counter);
		} catch (error) {
			console.log('setting catch error' + error);
			
		}
	};

	const deleteTodo = async (id) => {
		console.log(id);
		setIsLoading(true);
		try {
			const api = await fetch('http://localhost:8080/delete-todo/' + id, {
				method: 'DELETE'
			});
			/* const data = */ await api.json(); // i dont care o data
			setIsLoading(false);
			setInputArray((prevInput) => {
				prevInput.filter((input) => input._id !== id);
			});
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

	let listData = inputArray.map((data, idx) => {
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

	const errorHandler =useCallback((msg) => {
		setError(msg);
	}, [])
	
	const closeErrorWindow = () => {
		setError(null);
	}

	return (
		<div className="App">
			<Header />

			{error && <ErrorModel onClose={closeErrorWindow}>{error}</ErrorModel>}

			<Form addTodo={addToList} loading={isLoading} />
			<Counter taskCount={counter} />
			<Search onLoadTodos={filteredTodosHandler} errorMsg={errorHandler} />
			<h2 className="list-heading">Todos</h2>
			<ul>{listData}</ul>
		</div>
	);
};

export default App;
// JAk použít async await , když use effect nemuže pobrat async???? - DEFINOVAT async funkci uvnitř fce useEffect
	/* useEffect(() => {
		const fetchData = () => {
			try {
			} catch (error) {}
		};
		fetchData();
	}); */