import { instans } from "./todolists-api"

export const tasksAPI = {
    getTasks(todolistID: string) {
        return  instans.get(`todo-lists/${todolistID}/tasks`)
    },
    // createTodolist(title: string) {
    //     return instans.post<ResponseType<todolistType>>(`todo-lists`, {title: title})
    // },
    // deleteTodolist(todolistID: string) {
    //     return instans.delete<ResponseType>(`todo-lists/${todolistID}`)
    // },
    // updateTodolistTitle(todolistID: string, newTitle: string) {
    //     return instans.put<ResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    // }
}