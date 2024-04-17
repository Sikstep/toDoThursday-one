import axios from 'axios';

export type todolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseTodoType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors:Array<any>
    resultCode: number
}

export const instans = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    },
    })

export const todolistsAPI = {
    getTodolists() {
        return  instans.get<todolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instans.post<ResponseTodoType<todolistType>>(`todo-lists`, {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instans.delete<ResponseTodoType>(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instans.put<ResponseTodoType>(`todo-lists/${todolistID}`, {title: newTitle})
    }
}