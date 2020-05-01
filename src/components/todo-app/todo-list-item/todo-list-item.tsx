import React from 'react';
import './todo-list-item.css';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExclamationIcon from '@material-ui/icons/PriorityHigh';

type TodoListItemType = {
    label: string;
    done: boolean;
    important: boolean;
    onDelete: () => void,
    onDone: () => void,
    onImportant: () => void,
}

const TodoListItem = ({ label, onDelete, onDone, onImportant, done, important }: TodoListItemType) => {
    let classNames = 'todo-list-item';

    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    return (<Grid container justify="space-between" className={classNames}>
        <Grid container item direction="row">
            <Grid container item direction="row" xs={8}>
                <span className="todo-list-item-label" onClick={onDone}>{label}</span>
            </Grid>
            <Grid container item direction="row" xs={4}>
                <IconButton color="primary" edge="start" onClick={onDelete} aria-label="menu">
                    <DeleteIcon />
                </IconButton>
                <IconButton color="secondary" edge="start" onClick={onImportant} aria-label="menu">
                    <ExclamationIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Grid>);
};

export default TodoListItem;