import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b',
    },
})


export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}
export const todolistsAPI = {

    getTodolists() {
        return axios.get<TodolistsType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },
    createTodolist(newTitle: string) {
        return axios.post<ResponseType<{item: TodolistsType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: newTitle}, settings)
    },
    deleteTodolist(todolistID: string) {

        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistID}`, {title: newTitle})
    }


}