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

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResposneType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export const todolistsAPI = {

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(newTitle: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: newTitle})
    },
    deleteTodolist(todolistID: string) {

        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    }


}

export const tasksAPI = {
    getTasks(todolistID: string) {
        return instance.get<GetTasksResposneType>(`/todo-lists/${todolistID}/tasks`)
    },
    createNewTask(todolistID: string, newTaskName: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistID}/tasks`, {title: newTaskName})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTaskTitle(todolistID: string, taskID: string, newTaskTitle: string) {
        const updetingTaskTitleName: UpdateTaskType = {
            title: newTaskTitle,
            description: '',
            completed: false,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
        }
        return instance.put<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`, updetingTaskTitleName)
    }
}