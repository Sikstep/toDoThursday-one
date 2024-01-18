import axios from 'axios/index';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    }
}
export const todolistsAPI = {

    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
    },
    createTodolist(newTitle: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: newTitle}, settings)
    },
    deleteTodolist(todolistID: string) {

        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {title: newTitle}, settings)
    }


}