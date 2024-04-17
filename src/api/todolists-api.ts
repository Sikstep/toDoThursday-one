import axios from 'axios';

type FieldErrorType = {
    error: string
    field: string
}

export type todolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CreateTodolistResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors:FieldErrorType[]
    resultCode: number
}

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    },
    })

export const todolistsAPI = {
    getTodolists() {
        return  instance.get<todolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistResponseType<{item: todolistType}>>(`todo-lists`, {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<CreateTodolistResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instance.put<CreateTodolistResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    }
}