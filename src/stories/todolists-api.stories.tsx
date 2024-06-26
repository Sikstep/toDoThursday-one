import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'TodolistsAPI',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(res => setState(res.data))


        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
        setTitle('')
    }


    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={title} placeholder={'Введите title'} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [deletedID, setDeletedID] = useState<any>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDeletedID(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        todolistsAPI.deleteTodolist(deletedID)
            .then(res => setState(res.data))
        setDeletedID('')
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={deletedID} placeholder={'Введите ID todo листа'} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [updatedID, setUpdatedID] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<any>(null)

    const onChangeInputHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedID(e.currentTarget.value)
    }

    const onChangeInputHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        todolistsAPI.updateTodolistTitle(updatedID, newTitle)
            .then(res => setState(res.data))
        setUpdatedID('')
        setNewTitle('')
    }

    return (
        <div>
            <div>
                {JSON.stringify(state)}
            </div>
            <input type="text" value={updatedID} placeholder={'Введите ID тудулиста'}
                   onChange={onChangeInputHandlerID}/>
            <input type="text" value={newTitle} placeholder={'Введите новый title'}
                   onChange={onChangeInputHandlerTitle}/>
            <button onClick={onClickButtonHandler}>Submit</button>
        </div>
    )
}