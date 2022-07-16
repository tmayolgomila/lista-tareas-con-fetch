import React, {useState, useEffect} from "react";
import { getApiTask } from "./fetch.jsx";
import { putApiTask } from "./fetch.jsx";



//create your first component
const Home = () => {


	const [input, setInput] = useState("") //esto va a ser la entrada de la tarea

	const [tasks, setTasks] = useState([]) //este array va a ser la lista de tareas

	const urlApi = 'https://assets.breatheco.de/apis/fake/todos/user/tomeumayol';


	useEffect(() => {
		
		
		 getApiTask().then(data => 

				setTasks(data));
		
	}, [setTasks]);

	useEffect(() => {
		putApiTask(tasks);
	},[tasks]);
	

	



	const borrarTodo = () => {
		fetch(urlApi, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {

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
				label: input, //creamos un id random para cada entrada de la lista
				done: false
			}
			setTasks([...tasks, addTask]) ///(...esto es un spread operator)=>nos permite copiar rápidamente todo un array existente en otro array
			setInput("") //Aqui dejamos la entrada vacia despues de crear una tarea para poder crear otra
		}
	}


	//eliminar tareas
	const deleteTask = (label) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.label !== label); //.filter para devolver un array nuevo, no borra, creamos uno nuevo con todas las demas tareas que no tienen ese label
    setTasks(filteredTasks);
  };

  //eliminar todas las tareas
  const deleteAllTask = (label) => {
    let filteredTasks = [...tasks].filter(
      (tasks) => tasks.label === label && tasks.label !== label
    );
    setTasks(filteredTasks);
  };
		
		
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
					
					
					<div className="whatTodo" key={task.label}> {/* le pasamos dentro de la key el elemento con la label, esto nos permite tener cada tarea con una label diferente*/}

						<p>{task.label}<button className="deleteButton" onClick={() => deleteTask(task.label)}><i className="fa fa-trash fa-lg"></i></button></p></div>
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
