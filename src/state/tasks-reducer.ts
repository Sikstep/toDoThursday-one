import {AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {ModelType, tasksAPI, TaskStatuses, TaskType} from '../api/tasks-api';
import {AppThunk} from './store';
import {logger} from '@storybook/node-logger';

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskTitleAC>


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
            // const stateCopy = {...state}                           ---------Старое без запроса-----------
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     priority: TaskPriorities.Later,
            //     order: 0,
            //     todoListId: action.todolistId,
            //     description: '',
            //     addedDate: '',
            //     startDate: '',
            //     deadline: ''
            //
            // }
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.newTask.todoListId]: state[action.newTask.todoListId].map(t => (t.id === action.newTask.id ? action.newTask : t))
            }
        }

        default:
            return state;
    }
}

// Actions

export const setTasksAC = (tasks: TaskType[], todolistID: string) =>
    ({type: 'SET-TASKS', payload: {tasks, todolistID}} as const)
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

// export const addTaskAC = (title: string, todolistId: string) => {         старый без запроса
//     return {type: 'ADD-TASK', title, todolistId} as const
// }
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const updateTaskAC = (newTask: TaskType) => ({type: 'UPDATE-TASK', newTask} as const)

//Thunks

export const getTasksTC = (todolistID: string): AppThunk => async (dispatch) => {
    try {
        const res = await tasksAPI.getTasks(todolistID)
        dispatch(setTasksAC(res.data.items, todolistID))
    } catch (e) {
        console.log(e)
    }
}
export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => async (dispatch) => {
    try {
        const res = await tasksAPI.deleteTask(todolistID, taskID)
        dispatch(removeTaskAC(taskID, todolistID))
    } catch (e) {
        console.log(e)
    }

}
export const createTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    try {
        const res = await tasksAPI.createNewTask(todolistID, title)
        dispatch(addTaskAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}
export const updateTaskTC = (todolistID: string, taskID: string, model: ModelType): AppThunk => async (dispatch) => {
    try {
        const res = await tasksAPI.updateTaskModel(todolistID, taskID, model)
        dispatch(updateTaskAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
 }
export const _updateTaskTitleTC = (todolistID: string, taskID: string, title: string): AppThunk =>
    async (dispatch, getState) => {
        const rootState = getState()
        const task = rootState.tasks[todolistID].find(t => t.id === taskID)
        if (task) {
            const model: ModelType = {
                title,
                status: task.status,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,

            }
            try {
                const response = await tasksAPI.updateTaskModel(todolistID, taskID, model)
                dispatch(changeTaskTitleAC(taskID, title, todolistID))
            } catch (e) {
                console.log(e)
            }
        }
    }
export const updateTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses): AppThunk =>
    (dispatch, getState, extraArgument) => {
        const rootState = getState()

        const task = rootState.tasks[todolistID].find(t => t.id === taskID)
        if (task) {
            const model: ModelType = {
                title: task.title,
                status,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }
            tasksAPI.updateTaskModel(todolistID, taskID, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(taskID, status, todolistID))
                })
        }
    }
