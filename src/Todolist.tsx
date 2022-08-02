import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteOutline, HighlightOff} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}><HighlightOff/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} size={"small"} color={"primary"}></Checkbox>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton size={"small"} onClick={onClickHandler}>
                            <DeleteOutline/>
                        </IconButton>
                    </li>
                })
            }
        </List>
        <div>
            <Button style={{margin:'2px'}} disableElevation size={'small'} color={props.filter === 'all' ? "secondary" : 'primary'} variant={"contained"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button style={{margin:'2px'}} disableElevation size={"small"} color={props.filter === 'active' ? "secondary" : 'primary'} variant={"contained"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button style={{margin:'2px'}} disableElevation size={'small'} color={props.filter === 'completed' ? "secondary" : 'primary'} variant={"contained"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


