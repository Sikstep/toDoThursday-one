import React, {ChangeEvent, MouseEvent, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';
import {tasksAPI} from '../api/tasks-api';

export default {
    title: 'TasksAPI',
}

const defaultTodolistID = '02ffbc2c-e00c-48a8-bb4b-1d78984097be';

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>(defaultTodolistID);


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        tasksAPI.getTasks(todolistID).then(res => setState(res.data))
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={todolistID} placeholder={'Введите todolistID'} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>(defaultTodolistID)
    const [title, setTitle] = useState<any>(null)

    const onChangeInputHandlerTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onChangeInputHandlerNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        tasksAPI.createNewTask(todolistID, title)
            .then(res => setState(res.data))
        setTitle('')
    }


    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={todolistID} placeholder={'Введите todolistID'}
                   onChange={onChangeInputHandlerTodolistID}/>
            <input type="text" value={title} placeholder={'Введите title для таски'}
                   onChange={onChangeInputHandlerNewTaskTitle}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [deletedID, setDeletedID] = useState<any>(defaultTodolistID)
    const [taskID, setTaskID] = useState<any>(null)
    const onChangeInputHandlerTodoID = (e: ChangeEvent<HTMLInputElement>) => {
        setDeletedID(e.currentTarget.value)
    }

    const onChangeInputHandlerTaskID = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }
    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        tasksAPI.deleteTask(deletedID, taskID)
            .then(res => setState(res.data))
        setTaskID('')
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={deletedID} placeholder={'Введите ID todo листа'}
                   onChange={onChangeInputHandlerTodoID}/>
            <input type="text" value={taskID} placeholder={'Введите ID таски'} onChange={onChangeInputHandlerTaskID}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [updatedTodoID, setUpdatedTodoID] = useState<any>(defaultTodolistID)
    const [taskID, setTaskID] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<any>(null)

    const onChangeInputHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTodoID(e.currentTarget.value)
    }

    const onChangeInputHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onChangeInputHandlerTaskID = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        tasksAPI.updateTaskTitle(updatedTodoID, taskID, newTitle)
            .then(res => setState(res.data))
        setTaskID('')
        setNewTitle('')
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={updatedTodoID} placeholder={'Введите ID тудулиста'}
                   onChange={onChangeInputHandlerID}/>
            <input type="text" value={taskID} placeholder={'Введите taskID'}
                   onChange={onChangeInputHandlerTaskID}/>
            <input type="text" value={newTitle} placeholder={'Введите новый title'}
                   onChange={onChangeInputHandlerTitle}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}