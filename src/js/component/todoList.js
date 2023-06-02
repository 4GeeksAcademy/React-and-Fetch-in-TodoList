import React, { useState, useEffect } from "react";

export default function TodoList() {

    const [input, setInput] = useState('');
    const [todoList, setTodoList] = useState([]);


    useEffect(() => {
        console.log("Componente montado");
        setTodoList((prevTodoList) => prevTodoList = []);
        return () => {
            console.log("Componente desmontado");
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const newTask = {
                label: input,
                done: false
            };


            const response = postTask(input);
            console.log(response);
            setInput("");
            const data = getTask();
            setTodoList(data);

        }
    };
    // const handleDelete = (id) => {
    // setTodoList(prevTodoList => prevTodoList.filter(task => task.id !== id));
    // };


    const getTask = async () => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "GET",
                // body: JSON.stringify(todos),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            return data;
        }

        catch (error) {
            console.log(error);

        }
    }

    const postTask = async (req, res) => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "POST",
                body: JSON.stringify(req),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            return data;

        }

        catch (error) {
            console.log(error);

        }
    }

    const putTask = async (require, response) => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

        }

        catch (error) {
            console.log(error);

        }
    }

    const deleteTask = async (require, response) => {

        try {

            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/alex-alvaro', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

        }

        catch (error) {
            console.log(error);

        }
    }

    return (
        <>

            <form className="row d-flex justify-content-center mt-4">
                <div className="col-md-6">

                    {todoList.length === 0 ?
                        <input type="text" name="todoList" placeholder="No hay tareas, añadir tarea" className="form-control text-center" onKeyDown={handleKeyDown} onChange={e => setInput(e.target.value)} value={input} id="validationServer01" /> : <input type="text" name="todoList" placeholder="Añadir tarea" className="form-control" onKeyDown={handleKeyDown} onChange={e => setInput(e.target.value)} value={input} id="validationServer01" />
                    }
                    <ol className='list-group-numbered card p-0'>
                        {todoList.map((element, index) => {
                            if (element.done === false) {


                                return (<li className="list-group-item card-body border p-0" key={index}>
                                    {element.task}
                                </li>);
                            }
                        })}

                    </ol>
                    <p>{todoList.length} tareas pendientes</p>
                </div>
            </form>
        </>

    )
};