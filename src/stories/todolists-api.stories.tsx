import React, {useEffect, useState} from 'react'
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
    useEffect(() => {
        todolistsAPI.createTodolist('Lol!')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '2f25e092-5102-49b6-9ba7-c198d059668a';
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
        const newTitle = 'Are u ok?';
        todolistsAPI.updateTodolistTitle(todolistID, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
        tasksAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
        const taskName = 'My 4th new task';
        tasksAPI.createNewTask(todolistID, taskName)
            .then((res)=> {
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
        const taskID = '333841c4-45d3-49c4-b25f-716c6143dc5b';
        tasksAPI.deleteTask(todolistID, taskID)
            .then((res)=> {
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const updateTaskTitleName = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistID = 'd44414cc-dbd1-4153-9ce7-c51132fc2390';
        const taskID = 'c9766615-ea55-4326-b147-9f44d6af35f2';
        const newTitle = 'Change my 3th taskTitle =)';
        tasksAPI.updateTaskTitle(todolistID, taskID, newTitle)
            .then((res)=> {
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}
