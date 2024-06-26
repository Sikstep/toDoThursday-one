import { AxiosResponse } from 'axios'
import {instance, CreateTodolistResponseType} from './todolists-api'

export const tasksAPI = {
    getTasks(todolistID: string) {
        return  instance.get<ResponsTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createNewTask(todolistID: string, title: string) {
        return instance.post<CreateTodolistResponseType<{item: TaskType}>, AxiosResponse<CreateTodolistResponseType<{item: TaskType}>>, {title: string}>(`todo-lists/${todolistID}/tasks`, {title: title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<CreateTodolistResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTaskModel(todolistID: string, taskID: string, model: ModelType) {
        return instance.put<CreateTodolistResponseType<{item:TaskType}>, AxiosResponse<CreateTodolistResponseType<{item: TaskType}>>, ModelType>(`todo-lists/${todolistID}/tasks/${taskID}`,  model)
    }
}

//types

export type ModelType = {
    title: string
    description: string
    // completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New,
    inProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgenty,
    Later
}


export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export type ResponsTaskType = {
    items: TaskType[]
    totalCount: number
    error: null
}
