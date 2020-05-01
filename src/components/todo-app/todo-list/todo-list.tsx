import React from 'react';
import './todo-list.css';

import TodoListItem from '../todo-list-item';
import { TodoItemType } from '../../../pages/TodoApp';
import { List, ListItem } from '@material-ui/core';

type TodoListType = {
    todos: TodoItemType[],
    onDelete: (id: string) => void,
    onDone: (id: string) => void,
    onImportant: (id: string) => void,
}

const TodoList = ({ todos, onDelete, onDone, onImportant }: TodoListType) => {
    const elements = todos.map(({ id, ...others }) => {
        return <ListItem key={id} className="list-group-item">
            <TodoListItem {...others}
                onDelete={() => onDelete(id)}
                onDone={() => onDone(id)}
                onImportant={() => onImportant(id)}
            />
        </ListItem>;
    })
    return (
        <List>
            {elements}
        </List>
        );
};

export default TodoList;