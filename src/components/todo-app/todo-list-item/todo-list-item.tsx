import React from "react";
import "./todo-list-item.css";
import { Button, Col, Row } from "reactstrap";
import {TrashIcon, ZapIcon} from '@primer/octicons-react';

type TodoListItemType = {
  label: string;
  done: boolean;
  important: boolean;
  onDelete: () => void;
  onDone: () => void;
  onImportant: () => void;
};

const TodoListItem = ({
  label,
  onDelete,
  onDone,
  onImportant,
  done,
  important,
}: TodoListItemType) => {
  let classNames = "todo-list-item";

  if (done) {
    classNames += " done";
  }

  if (important) {
    classNames += " important";
  }

  return (
    <Row>
      <Col xs={8} className={classNames}>
        <span className="todo-list-item-label" onClick={onDone}>
          {label}
        </span>
      </Col>
      <Col xs={4} className="text-right">
          <Button className="mr-1 bg-danger" onClick={onDelete}>
              <TrashIcon/>
          </Button>
          <Button className="mr-1 bg-warning" onClick={onImportant}>
              <ZapIcon/>
          </Button>
      </Col>
    </Row>
  );
};

export default TodoListItem;
