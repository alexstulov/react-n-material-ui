import React from "react";
import "./todo-list.css";

import TodoListItem from "../todo-list-item";
import { TodoItemType } from "../../../pages/TodoApp";
import { ListGroup, ListGroupItem } from "reactstrap";

type TodoListType = {
  todos: TodoItemType[];
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  onImportant: (id: string) => void;
};

const TodoList = ({ todos, onDelete, onDone, onImportant }: TodoListType) => (
  <ListGroup>
    {todos.length ? todos.map(({ id, ...others }) => (
      <ListGroupItem key={id} className="list-group-item">
        <TodoListItem
          {...others}
          onDelete={() => onDelete(id)}
          onDone={() => onDone(id)}
          onImportant={() => onImportant(id)}
        />
      </ListGroupItem>
    )) : <h2>No list items</h2>}
  </ListGroup>
);

export default TodoList;
