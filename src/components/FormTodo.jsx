import { ListPlus, Faders, PencilSimpleLine, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

import ListTodo from "./ListTodo";
import { ModalTime } from "./ModalTime";


// Mengambil data dari local storage
const getTodosFromLS = () => {
    const todos = localStorage.getItem('todos');
    if (todos) {
        return JSON.parse(todos);
    } else {
        return [];
    }
}

const FormTodo = () => {

    //state text todo
    const [todo, setTodo] = useState('');
    //state list todo
    const [todos, setTodos] = useState(getTodosFromLS());
    //state filer todo
    const [filter, setFilter] = useState('all')
    //state pick time
    const [timeTodo, setTimeTodo] = useState('')


    const handlePickTIme = (e) => {
        e.preventDefault();
        setTimeTodo(e.target.value)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setTodo(e.target.value);
    }

    //fungsi untuk menambahkan todo
    const handleAddTodo = () => {

        //ambil waktu saat ini sebagai ID todo
        const date = new Date()
        const time = date.getTime()

        //cek jika input todo tidak kosong atau inputnya spasi
        if (todo.trim() !== '') {
            let todoObject = {
                ID: time,
                text: todo,
                completed: false,
                priority: false,
                time: timeTodo,
            }
            //output dalam local storage 
            const newTodos = [...todos, todoObject];

            //sortir berdasarkan ID, todo yang paling baru akan berada di atas
            newTodos.sort((a, b) => b.ID - a.ID)
            setTodos(newTodos);
            setTodo('');
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            document.getElementById('modal_add').showModal();
        }
    }

    const handleEnterEdit = (e) => {
        if (e.key === "Enter") {
            document.getElementById('modal_edit').showModal();
        }
    }

    //fungsi untuk menghapus todo berdasarkan ID
    const handleDelete = (id) => {
        const filterTodo = todos.filter((todo) => todo.ID !== id);
        setTodos(filterTodo);
    }

    //simpan data todo ke local storage ketika ada perubahan pada state todos
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    //fungsi untuk menandai todo yang sudah selesai
    const handleCheckboxChange = (id) => {
        let todoUpdate = []

        todos.map((todo) => {
            if (todo.ID == id) {
                todo.completed = !todo.completed
            }
            todoUpdate.push(todo)
            setTodos(todoUpdate)
        })
    }

    //state untuk edit todo yang dipilih
    const [id, setId] = useState(null)

    //state untuk menampilkan input edit
    const [editInput, setInput] = useState(false)

    //fungsi untuk menampilkan input edit dan value todo yang dipilih
    const handleEdit = (todo, index) => {
        setInput(true)
        setTodo(todo.text)
        setId(index)
    }

    //fungsi untuk update todo yang dipilih
    const handleUpdate = () => {
        let items = [...todos]
        let item = items[id]

        item.text = todo
        item.time = timeTodo 
        item.completed = false

        items[id] = item
        if (todo.trim() !== '') {
            setTodos(items)
            setInput(false)
            setTodo('')
        }
    }

    //fungsi untuk filter todo
    const handleFilter = (filter) => {
        setFilter(filter)
    }

    //fungsi arrray baru untuk menampilkan todo yang sudah di filter
    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") {
            return true
        } else if (filter === "completed") {
            return todo.completed
        } else if (filter === "priority") {
            return todo.priority
        } else {
            return !todo.completed
        }
    })

//fungsi untuk menandai todo prioritas
    const handlePriority = (id) => {
        let todoUpdate = [...todos]

        const todoIndex = todoUpdate.findIndex((todo) => todo.ID === id)

        if (todoIndex === -1) return

        todoUpdate[todoIndex].priority = !todoUpdate[todoIndex].priority

        if (todoUpdate[todoIndex].priority) {
            todoUpdate.sort((a, b) => {
                if (a.priority && !b.priority) return -1
                if (!a.priority && b.priority) return 1
                return 0
            })
        }
        setTodos(todoUpdate)
    }

    return (
        <>
            {
                editInput === true ? null :
                    <div className="flex justify-between gap-2">
                        <input
                            type="text"
                            placeholder="Add Something..."
                            className="input input-bordered input-accent w-full"
                            value={todo}
                            onChange={handleChange}
                            onKeyDown={handleEnter}
                        />

                        <div className="flex gap-2">
                            <div className="tooltip" data-tip="Add">

                                <button
                                    className="btn  btn-accent"
                                    onClick={() => document.getElementById('modal_add').showModal()}
                                ><ListPlus size={28} />
                                </button>
                            </div>
                            <div className="tooltip" data-tip="Filter">
                                <details className="dropdown dropdown-top">
                                    <summary className="btn btn-accent">
                                        <Faders size={28} />
                                    </summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">

                                        <li><a onClick={() => handleFilter("all")}>All</a></li>
                                        <li><a onClick={() => handleFilter("completed")}>Completed</a></li>
                                        <li><a onClick={() => handleFilter("uncompleted")}>Uncompleted</a></li>
                                        <li><a onClick={() => handleFilter("priority")}>Priority</a></li>
                                        

                                    </ul>
                                </details>
                            </div>
                        </div>


                        <ModalTime
                            id={'modal_add'}
                            value={timeTodo}
                            onChange={handlePickTIme}
                            onClick={handleAddTodo}
                        />



                    </div>



            }

            {
                editInput ? <div className="flex justify-between gap-2">
                    <input
                        type="text"
                        className="input input-bordered input-accent w-full"
                        value={todo}
                        onChange={handleChange}
                        onKeyDown={handleEnterEdit}
                    />
                    <div className="flex gap-2">
                        <div className="tooltip" data-tip="Update">

                            <button
                                className="btn btn-accent"
                                onClick={() => document.getElementById('modal_edit').showModal()}
                            ><PencilSimpleLine size={28} />
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Cancel">
                            <button
                                className="btn btn-accent"
                                onClick={() => {
                                    setInput(!editInput)
                                    setTodo('')
                                }}
                            ><X size={24} />
                            </button>
                        </div>
                    </div>

                <ModalTime 
                id={'modal_edit'}
                value={timeTodo}
                onChange={handlePickTIme}
                onClick={handleUpdate}
                />

                </div>
                    : null
            }

            {/* List Todo */}
            {filteredTodos.map((todo, index) => (

                <ListTodo
                    key={index}
                    text={todo.text}
                    completed={todo.completed}
                    priority={todo.priority}
                    time={todo.time}
                    handleDelete={() => handleDelete(todo.ID)}
                    handleCheckboxChange={() => handleCheckboxChange(todo.ID)}
                    handleEdit={() => handleEdit(todo, index)}
                    handlePriority={() => handlePriority(todo.ID)}
                />

            ))}

        </>
    );
}

export default FormTodo;
