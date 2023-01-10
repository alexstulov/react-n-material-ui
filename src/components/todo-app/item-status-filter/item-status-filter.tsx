import React from "react";
import "./item-status-filter.css";
// import { ButtonGroup, Button } from '@mui/material/';
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";

type ItemStatusFilterType = {
  statusFilter: string;
  onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const ItemStatusFilter = ({ statusFilter, onClick }: ItemStatusFilterType) => {
  const buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  const buttonElements = buttons.map(({ name, label }) => {
    const keyColor = name === statusFilter ? "primary" : "default";
    return (
      <Button
        key={name}
        id={name}
        type="button"
        onClick={onClick}
        color={keyColor}
      >
        {label}
      </Button>
    );
  });

  return (
    <ButtonToolbar>
      <ButtonGroup>{buttonElements}</ButtonGroup>
    </ButtonToolbar>
  );
};

export default ItemStatusFilter;
