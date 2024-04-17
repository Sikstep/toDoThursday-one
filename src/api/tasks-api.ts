import { instans } from "./todolists-api"

export type tasksType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

export type ResponsTaskType = {
    items: tasksType[]
    totalCount: number
    error: null
}


export const tasksAPI = {
    getTasks(todolistID: string) {
        return  instans.get<ResponsTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createNewTask(todolistID: string, title: string) {
        return instans.post<ResponseType>(`todo-lists/${todolistID}/tasks`, {title: title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instans.delete<ResponseType>(`todo-lists/${todolistID}/${taskID}`)
    },
    // updateTodolistTitle(todolistID: string, newTitle: string) {
    //     return instans.put<ResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    // }
}