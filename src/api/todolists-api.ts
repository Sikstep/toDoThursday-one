import axios from 'axios';

const settings = {
    withCredentials: true,

}

const instans = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    },
    })

export const todolistsAPI = {
    getTodolists() {
        return  instans.get(`todo-lists`)
    },
    createTodolist(title: string) {
        return instans.post(`todo-lists`, {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instans.delete(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instans.put(`todo-lists/${todolistID}`, {title: newTitle})
    }
}