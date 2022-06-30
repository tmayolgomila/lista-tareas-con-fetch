import React, {useState, useEffect} from "react";



//create your first component
const Home = () => {


	const [input, setInput] = useState("") //esto va a ser la entrada de la tarea

	const [tasks, setTasks] = useState([]) //este array va a ser la lista de tareas

	const urlApi = 'https://assets.breatheco.de/apis/fake/todos/user/tomeumayol';

	useEffect(() => {
		getTareas();
	}, []);
	useEffect(() => {
		borrarTodo();
	}, []);
	useEffect(() => {
		putTareas();
	}, []);
	

	


	const getTareas = () => {
		fetch(urlApi, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTasks(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};

	const postTareas = () => {
		fetch(urlApi, {
			method: "POST",
			body: [],
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				//console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				//console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				setTasks(data);
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				//console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};


		const putTareas = () => {
		fetch(urlApi, {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};
	const borrarTodo = () => {
		fetch(urlApi, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				//console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				//console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				//console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => getTareas(data))

			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};
	
	const handleSubmit = (event) =>{
		event.preventDefault() // cancelamos el evento, si la entrada esta vacia no queremos que entre en la lista de tareas
		if (input != ""){
			const addTask = {
				id: Math.floor(Math.random()*100000), //creamos un id random para cada entrada de la lista
				text: input
			}
			setTasks([...tasks, addTask]) ///(...esto es un spread operator)=>nos permite copiar rápidamente todo un array existente en otro array
			setInput("") //Aqui dejamos la entrada vacia despues de crear una tarea para poder crear otra
		}
	}


	//eliminar tareas
	const deleteTask =(id) => {
		let filteredTasks = [...tasks].filter((tasks)=>tasks.id !== id) //.filter para devolver un array nuevo, no borra, creamos uno nuevo con todas las demas tareas que no tienen ese id
		setTasks(filteredTasks); 
	}
	console.log(input)

		//eliminar todas las tareas
		const deleteAllTask =(id) => {
			let filteredTasks = [...tasks].filter((tasks)=>tasks.id === id && tasks.id !== id) 
			setTasks(filteredTasks); 
		}
		console.log(input)
		
		return (
			
		<div className="target">
			<h1 className="todos">Todo List</h1>	
			<div className="listCard">
				<form onSubmit={handleSubmit}>
				<input
				value={input}
				onChange={event => setInput(event.target.value)}
				className="inputBox"
				placeholder="Add task"
				type="text"/>
				</form>

				<div className="task">
					{/* con el .map vamos a mostrar la tarea que vamos a listar*/}
					{tasks.map(task =>(
					
					
					<div className="whatTodo" key={task.id}> {/* le pasamos dentro de la key el elemento con la id, esto nos permite tener cada tarea con una id diferente*/}

						<p>{task.text}<button className="deleteButton" onClick={() => deleteTask(task.id)}><i className="fa fa-trash fa-lg"></i></button></p></div>
						))
					}
					<p className="counter">Left tasks {(tasks.length)} </p>
					<p><button className="totalDelete" onClick={() => deleteAllTask()} ><i className="fa fa-brush fa-lg">Clean</i></button></p>
				</div>
			</div>
		</div>
		
	);
};

export default Home;
