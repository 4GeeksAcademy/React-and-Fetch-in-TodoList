import React, { useState, useEffect } from "react";

export default function TodoList() {

    const [input, setInput] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [status, setStatus] = useState(false);

    console.log(todoList);


    useEffect(() => {
        console.log("Componente montado");
        getTask();
        console.log(todoList);
        if (todoList.length === 0) {
            postTask();
        }
        return () => {
            console.log("Componente desmontado");
        };
    }, []);
    useEffect(() => {
        if (todoList.length > 0) { putTask(todoList) };
    }, [todoList]);

    const handleAddTask = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const newTask = {
                label: input,
                done: false
            };

            setTodoList([...todoList, newTask]);
            setInput("");
            // setStatus((prevStatus) => !prevStatus);

        }
    };


    const getTask = async () => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                await setTodoList(data);
            }
        }

        catch (error) {
            console.log(error);

        }
    }
    const postTask = async () => {
        console.log(`creamos usuario ${todoList.length}`)
        if (todoList.length > 0) {
            try {

                const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                    method: "POST",
                    body: JSON.stringify([]),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const message = await response.json();

            }

            catch (error) {
                console.log(error);

            }
        }
    }

    const putTask = async () => {
        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "PUT",
                body: JSON.stringify(todoList),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const message = await response.json();
            console.log(message);

        }

        catch (error) {
            console.log(error);

        }
    }

    const deleteTask = async () => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // setTodoList([]);
            // postTask();
        }

        catch (error) {
            console.log(error);

        }
    }
    const handleDeleteClick = () => {
        deleteTask();
    }
    const handleDeleteTask = (index) => {
        let aux = [...todoList];
        // aux[index].done = true;
        console.log(aux[index]);
        setTodoList(aux);
        aux.splice(index, 1);
        //  setStatus((prevStatus) => !prevStatus);

    }
    return (
        <>

            <form className="row d-flex justify-content-center mt-4">
                <div className="col-md-6">

                    {todoList.length === 0 ?
                        <input type="text" name="todoList" placeholder="No hay tareas, añadir tarea" className="form-control text-center" onKeyDown={handleAddTask} onChange={e => setInput(e.target.value)} value={input} id="validationServer01" /> : <input type="text" name="todoList" placeholder="Añadir tarea" className="form-control" onKeyDown={handleAddTask} onChange={e => setInput(e.target.value)} value={input} id="validationServer01" />
                    }
                    <div>
                        <ol className='list-group-numbered card p-0'>
                            {todoList.map((element, index) => (
                                <li onClick={() => handleDeleteTask(index)} className="list-group-item card-body border p-0" key={index}>
                                    {element.label}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className=" row d-flex justify-content-center align-items-center mt-4">
                    <div className="col-md-6 col-8 align-items-center">{todoList.length} tareas(solo se veran las tareas pendientes).</div>
                    <button type="button" onClick={handleDeleteClick} className=" col-md-3 col-8 btn btn-danger align-items-center">Eliminar</button>
                </div>
            </form>
        </>

    )
};