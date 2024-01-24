import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI, todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Sikstep'})
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>('');
    // useEffect(() => {
    //     todolistsAPI.createTodolist('Lol!')
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const CreateTodolistHandler = () => {
        todolistsAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data)
            })
        setTodolistTitle('')
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistTitle'} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={CreateTodolistHandler}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('');
    // useEffect(() => {
    //     const todolistID = '2f25e092-5102-49b6-9ba7-c198d059668a';
    //     todolistsAPI.deleteTodolist(todolistID)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const DeleteTodolistonClickHandler = () => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
        setTodolistID('')
    }


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <button onClick={DeleteTodolistonClickHandler}>Create Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('');
    const [newTodolistTitle, setNewTodolistTitle] = useState<string>('');
    // useEffect(() => {
    //     const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
    //     const newTitle = 'Are u ok?';
    //     todolistsAPI.updateTodolistTitle(todolistID, newTitle)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const UpdateTodolistTitleOnClickHandler = () => {
        todolistsAPI.updateTodolistTitle(todolistID, newTodolistTitle)
            .then((res) => {
                setState(res.data)
            })
        setNewTodolistTitle('')
        setTodolistID('')
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'newTodolistTitle'} value={newTodolistTitle}
                   onChange={(e) => setNewTodolistTitle(e.currentTarget.value)}/>
            <button onClick={UpdateTodolistTitleOnClickHandler}>Update Todolist Title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('');
    useEffect(() => {
        const todolistID = 'c3faed74-4c1b-4f83-80b8-8af34f48d836';
        tasksAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    const GetTodolistTasksOnclickHandler = () => {
        tasksAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })

    }


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={event => setTodolistID(event.currentTarget.value)}/>
            <button onClick={GetTodolistTasksOnclickHandler}>Get todolist tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');
    // useEffect(() => {
    //     const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
    //     const taskName = 'My 4th new task';
    //     tasksAPI.createNewTask(todolistID, taskName)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const CreateTaskOnclickHandler = () => {
        tasksAPI.createNewTask(todolistID, taskTitle)
            .then((res) => {
                setState(res.data)
            })
        setTaskTitle('')
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={event => setTodolistID(event.currentTarget.value)}/>
            <input placeholder={'taskName'} value={taskTitle}
                   onChange={event => setTaskTitle(event.currentTarget.value)}/>
            <button onClick={CreateTaskOnclickHandler}>Create Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskID, setTaskID] = useState<string>('');
    const [todolistID, setTodolistID] = useState<string>('');
    // useEffect(() => {
    //     const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
    //     const taskID = '333841c4-45d3-49c4-b25f-716c6143dc5b';
    //     tasksAPI.deleteTask(todolistID, taskID)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const deleteTaskHandler = () => {

        tasksAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
        setTaskID('')
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={event => setTodolistID(event.currentTarget.value)}/>
            <input placeholder={'taskID'} value={taskID} onChange={event => setTaskID(event.currentTarget.value)}/>
            <button onClick={deleteTaskHandler}>delete task</button>
        </div>
    </div>
}

export const updateTaskTitleName = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [taskID, setTaskID] = useState<string>('');
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    // useEffect(() => {
    //     const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
    //     const taskID = '4cb7ec33-fadc-423d-8ac0-4c9d40731f0b';
    //     const newTitle = 'Epta Title';
    //     tasksAPI.updateTaskTitle(todolistID, taskID, newTitle)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])

    const UpdateTaskTitleOnclickHandler = () => {
        tasksAPI.updateTaskTitle(todolistID, taskID, newTaskTitle)
            .then((res) => {
                setState(res.data)
            })
        setNewTaskTitle('');
        setTaskID('')
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todolistID'} value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}/>
        <input placeholder={'taskID'} value={taskID} onChange={e => setTaskID(e.currentTarget.value)}/>
        <input placeholder={'newTaskTitle'} value={newTaskTitle} onChange={e => setNewTaskTitle(e.currentTarget.value)}/>
        <button onClick={UpdateTaskTitleOnclickHandler}>Submit new task title</button>
    </div>
    </div>
}
