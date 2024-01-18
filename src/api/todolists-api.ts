import axios from 'axios';

// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
//     }
// }

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

export type TasksType = {
    items:[]
    totalCount: number
    error: any
}
export const todolistsAPI = {

    getTodolists() {
        return instance.get<TodolistsType[]>('todo-lists');
    },
    createTodolist(newTitle: string) {
        return instance.post<ResponseType<{item: TodolistsType}>>('todo-lists', {title: newTitle})
    },
    deleteTodolist(todolistID: string) {

        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistID}`, {title: newTitle})
    }


}

export const tasksAPI = {
    getTasks(todolistID:string) {
        return instance.get(`/todo-lists/${todolistID}/tasks`)
    }
}