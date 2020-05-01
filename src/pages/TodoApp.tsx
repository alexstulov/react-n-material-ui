import React, {useState} from 'react';
import {GenerateUUID} from '../utils';

import AddItem from '../components/todo-app/add-item';
import TodoList from '../components/todo-app/todo-list';
import Header from '../components/todo-app/header';
import SearchPanel from '../components/todo-app/search-panel';
import ItemStatusFilter from '../components/todo-app/item-status-filter';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: "2rem auto 0 auto",
        maxWidth: "500px"
    }

});

export type TodoItemType = {
    id: string;
    label: string;
    done: boolean;
    important: boolean;
};

const TodoApp = () => {
    const classes = useStyles();
    const createTodoItem = (label: string, done:boolean = false): TodoItemType => {
        return {
            id: GenerateUUID(),
            label,
            done,
            important: false
        }
    };

    const defaultTodoData: TodoItemType[] = [
        createTodoItem('Drink Coffee'),
        createTodoItem('Make Awesome App'),
        createTodoItem('Have a lunch'),
    ];

    const [todoData, setTodoData] = useState(defaultTodoData);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const deleteItem = (idToDelete: string): void => {
        setTodoData(
            [...todoData.filter(({id}) => id !== idToDelete)]
        );
    }

    const addItem = (text: string): void => {
        setTodoData(
            [...todoData, createTodoItem(text)]
        );
    }

    const toggleProperty = (data: TodoItemType[], id: string, name: 'done' | 'important'): TodoItemType[] => {
        const todoIndex: number = data.findIndex((todo) => todo.id === id);
        const prev: TodoItemType[] = data.slice(0, todoIndex);
        const next: TodoItemType[] = data.slice(todoIndex+1);
        const todoItem: TodoItemType = data[todoIndex];
        const newItem = {
            ...todoItem,
            [name]: !todoItem[name]
        };

        return [
            ...prev,
            newItem,
            ...next
        ]
    }

    const toggleImportant = (id: string): void => {
        setTodoData(
            [...toggleProperty(todoData, id, 'important')]
        );
    }

    const toggleDone = (id: string): void => {
        setTodoData(
            [...toggleProperty(todoData, id, 'done')]
        );
    }

    const onSearchQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setSearchQuery(
            event.currentTarget.value
        );
    }

    const onStatusFilterChange = (event: React.FormEvent<HTMLButtonElement>): void => {
        setStatusFilter(
            event.currentTarget.id
        );
    }

    const doneCount:number = todoData.filter((item) => item.done).length;
    const todoCount:number = todoData.length - doneCount;

    const filteredData = todoData
    .filter((item) => {
        return item.label.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((item) => {
        switch(statusFilter) {
            case "active":
                return !item.done;
            case "done":
                return item.done;
            case "all":
            default:
                return true;
        }
    });

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container item direction="row">
                    <Header done={doneCount} toDo={todoCount} />
                </Grid>
                <Grid container item direction="row">
                    <SearchPanel query={searchQuery} onChange={onSearchQueryChange}/>
                    <ItemStatusFilter statusFilter={statusFilter} onClick={onStatusFilterChange}/>
                </Grid>
                <Grid container item direction="column">
                    <TodoList todos={filteredData}
                    onDelete={deleteItem}
                    onDone={toggleDone}
                    onImportant={toggleImportant} />
                </Grid>
                <Grid container item direction="row">
                    <AddItem addItem={addItem}/>    
                </Grid>
            </Grid>
            <div className="search-panel d-flex justify-content-between mb-3">
            </div>
        </div>
    );
};

export default TodoApp;