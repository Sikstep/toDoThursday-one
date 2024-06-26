import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    _setTodolistsThunkTC,
    addTodolistAC, addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodoTitleTC,
    FilterValuesType,
    removeTodolistAC, removeTodolistTC
} from './state/todolists-reducer';
import {_updateTaskTitleTC, createTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTC} from './state/tasks-reducer';
import {useAppDispatch, useAppSelector} from './state/store';
import {ModelType, TaskStatuses, TaskType} from './api/tasks-api';
import {TodolistType} from './api/todolists-api';


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(_setTodolistsThunkTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        // const action = removeTaskAC(id, todolistId);     ----до запроса----
        // dispatch(action);
        dispatch(removeTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        // const action = addTaskAC(title, todolistId);       ----до запроса----
        // dispatch(action);
        dispatch(createTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeTaskStatusAC(id, status, todolistId);
        // dispatch(action);
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        // const action = changeTaskTitleAC(id, newTitle, todolistId);         ----до запроса----
        // dispatch(action);
        // const model: ModelType = {
        //     title: newTitle,
        //     description: '',
        //     // completed: false,
        //     status: 1,
        //     priority: 3,
        //     startDate: '',
        //     deadline: '',
        // }
        // dispatch(updateTaskTC(todolistId, id, model))
        dispatch(_updateTaskTitleTC(todolistId, id, newTitle))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        // const action = removeTodolistAC(id);        ------- до thunk--------
        // dispatch(action);
        dispatch(removeTodolistTC(id))

    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        // const action = changeTodolistTitleAC(id, title);             ------- до thunk--------
        // dispatch(action);
        dispatch(changeTodoTitleTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
        // const action = addTodolistAC(title);   ------- до thunk--------
        // dispatch(action);
        dispatch(addTodoListTC(title))
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
