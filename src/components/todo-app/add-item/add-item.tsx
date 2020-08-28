import React, { useState } from "react";
import "./add-item.css";
// import { TextField, Button } from "@material-ui/core";
import { FormGroup, Input, Button, Row, Col } from "reactstrap";

type AddItemType = {
  addItem: (text: string) => void;
};

const AddItem = ({ addItem }: AddItemType) => {
  const [label, setLabel] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem(label);
    setLabel("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.currentTarget.value);
  };

  return (
    <form id="addItemForm" className="my-3" onSubmit={onSubmit}>
      <Row>
        <Col xs={10}>
          <FormGroup className="add-item d-flex">
            <Input
              className="form-control"
              onChange={handleChange}
              label="What needs to be done"
              value={label}
            />
          </FormGroup>
        </Col>
        <Col xs={2}>
          <Button type="submit" className="btn btn-secondary btn-md">
            Add
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddItem;
