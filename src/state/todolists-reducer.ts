import {TodolistDomainType} from '../App';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => (tl.id === action.id ? {...tl, title: action.title} : tl))
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOS': {
            return action.todolists.map((tl) => ({...tl, filter: 'all'}))
        }
        default:
            return state;
    }
}

// Actions
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOS',todolists} as const)
export const removeTodolistAC = (todolistId: string) => ({
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const)
export const addTodolistAC = (title: string, todolistId: string) => ({
        type: 'ADD-TODOLIST',
        payload: {title, todolistId}

    } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)

// ---------- без axios------------
// export const setTodolistsThunkTC = ():AppThunk => (dispatch: Dispatch<ActionsType>) => {
//     todolistsAPI.getTodolists()
//         .then((res) => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }

// Thunks
export const _setTodolistsThunkTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        console.log(e)
    }

}
export const addTodoListTC = (title: string): AppThunk => async (dispatch) => {
    try {
        const response = await todolistsAPI.createTodolist(title)
        dispatch(addTodolistAC(response.data.data.item.title, response.data.data.item.id))
    } catch (e) {
        console.log(e)
    }
}
export const removeTodolistTC = (todolistID: string): AppThunk => async (dispatch) => {
    try {
        await todolistsAPI.deleteTodolist(todolistID)
        dispatch(removeTodolistAC(todolistID))
    } catch (e) {
        console.log(e)
    }
}
export const changeTodoTitleTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    try {
        const response = await todolistsAPI.updateTodolistTitle(todolistID, title)
        console.log(response.data)
        dispatch(changeTodolistTitleAC(todolistID, title))
    } catch (e) {
        console.log(e)
    }
}

//types

export type FilterValuesType = 'all' | 'active' | 'completed';

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type GetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | GetTodolistsActionType