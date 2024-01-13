import axios from 'axios/index';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd81fccac-5744-451d-a285-45fc5bdcae7b'
    }
}
export const todolistsAPI = {

    getTodolists() {
        const promis = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings);
        return promis
    }
}