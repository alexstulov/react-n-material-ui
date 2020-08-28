import React, { useState } from "react";
import { GenerateUUID } from "../utils";

import AddItem from "../components/todo-app/add-item";
import TodoList from "../components/todo-app/todo-list";
import Header from "../components/todo-app/header";
import SearchPanel from "../components/todo-app/search-panel";
import ItemStatusFilter from "../components/todo-app/item-status-filter";
import { Container, Row, Col } from "reactstrap";

export type TodoItemType = {
  id: string;
  label: string;
  done: boolean;
  important: boolean;
};

const TodoApp = () => {
  const createTodoItem = (
    label: string,
    done: boolean = false
  ): TodoItemType => {
    return {
      id: GenerateUUID(),
      label,
      done,
      important: false,
    };
  };

  const defaultTodoData: TodoItemType[] = [
    createTodoItem("Drink Coffee"),
    createTodoItem("Make Awesome App"),
    createTodoItem("Have a lunch"),
  ];

  const [todoData, setTodoData] = useState(defaultTodoData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const deleteItem = (idToDelete: string): void => {
    setTodoData([...todoData.filter(({ id }) => id !== idToDelete)]);
  };

  const addItem = (text: string): void => {
    setTodoData([...todoData, createTodoItem(text)]);
  };

  const toggleProperty = (
    data: TodoItemType[],
    id: string,
    name: "done" | "important"
  ): TodoItemType[] => {
    const todoIndex: number = data.findIndex((todo) => todo.id === id);
    const prev: TodoItemType[] = data.slice(0, todoIndex);
    const next: TodoItemType[] = data.slice(todoIndex + 1);
    const todoItem: TodoItemType = data[todoIndex];
    const newItem = {
      ...todoItem,
      [name]: !todoItem[name],
    };

    return [...prev, newItem, ...next];
  };

  const toggleImportant = (id: string): void => {
    setTodoData([...toggleProperty(todoData, id, "important")]);
  };

  const toggleDone = (id: string): void => {
    setTodoData([...toggleProperty(todoData, id, "done")]);
  };

  const onSearchQueryChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.currentTarget.value);
  };

  const onStatusFilterChange = (
    event: React.FormEvent<HTMLButtonElement>
  ): void => {
    setStatusFilter(event.currentTarget.id);
  };

  const doneCount: number = todoData.filter((item) => item.done).length;
  const todoCount: number = todoData.length - doneCount;

  const filteredData = todoData
    .filter((item) => {
      return item.label.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((item) => {
      switch (statusFilter) {
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
    <Container style={{ maxWidth: "500px" }}>
      <Row className="my-2">
        <Col>
          <Header done={doneCount} toDo={todoCount} />
        </Col>
      </Row>
      <Row className="my-2">
        <Col xs={7}>
          <SearchPanel query={searchQuery} onChange={onSearchQueryChange} />
        </Col>
        <Col xs={5}>
          <ItemStatusFilter
            statusFilter={statusFilter}
            onClick={onStatusFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoList
            todos={filteredData}
            onDelete={deleteItem}
            onDone={toggleDone}
            onImportant={toggleImportant}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddItem addItem={addItem} />
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp;
