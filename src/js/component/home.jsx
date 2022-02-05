import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [userInput, setInputValue] = useState("");
	const [userList, setListtValue] = useState([]);

	/*function removeItem(id) {
		const newList = userList.filter((item) => item.id !== id);
		setListtValue(newList);
		console.log("deberia de borrar");
	}*/

	function postTodo(e) {
		e.preventDefault();
		// console.log(userInput);
		setListtValue([...userList, { label: userInput, done: false }]);
		actualizarTodos(userList);
		console.log(userList);
	}

	function actualizarTodos(todoList) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/davidsalas", {
			method: "PUT",
			body: JSON.stringify(todoList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	}

	useEffect(() => {
		//escribir codigo aqui
		fetch("https://assets.breatheco.de/apis/fake/todos/user/davidsalas", {
			method: "GET",
		})
			.then((resp) => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				setListtValue(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, []);
	console.log(userList);
	return (
		<div>
			<h1>TODOS</h1>
			<form onSubmit={postTodo}>
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="What needs to be done"
						aria-describedby="button-addon2"
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button
						className="btn btn-outline-secondary"
						type="submit"
						id="button-addon2">
						Mark as todo
					</button>
				</div>
			</form>
			<ul>
				{userList.map((item, index) => (
					<>
						<li key={index}>
							<span>
								<i
									key={index}
									className="fa fa-trash"
									onClick={() => removeItem(index)}></i>
							</span>
							{item.label}
						</li>
					</>
				))}
			</ul>

			<p>{userList.length} items left</p>
		</div>
	);
};

export default Home;
