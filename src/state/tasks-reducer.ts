import {v1} from 'uuid';
import {AddTodolistActionType, GetTodolists, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from '../api/tasks-api';
import {Dispatch} from 'redux';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolists
    | SetTasksActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Later,
                order: 0,
                todoListId: action.todolistId,
                description: '',
                addedDate: '',
                startDate: '',
                deadline: ''

            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;
        }
        case 'SET-TODOS': {
            const copyState = {...state}
            action.payload.forEach((tl) => copyState[tl.id] = [])
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistID]: action.payload.tasks}
        }
        default:
            return state;
    }
}

export const setTasksAC = (tasks: TaskType[], todolistID: string) => {
    return {
        type: 'SET-TASKS',
        payload: {tasks, todolistID}
    } as const
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksAPI.getTasks(todolistID)
        .then((res) => {
            console.log(res.data.items)
            dispatch(setTasksAC(res.data.items, todolistID))
        })
}