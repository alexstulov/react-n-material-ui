import React, { useState } from 'react';
import './add-item.css';
import { TextField, Button } from '@material-ui/core';

type AddItemType = {
    addItem: (text: string) => void
};

const AddItem = ({addItem}: AddItemType) => {
    const [label, setLabel] = useState('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addItem(label);
        setLabel('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.currentTarget.value);
    };

    return (
        <form id="addItemForm" className="add-item d-flex" onSubmit={onSubmit}>
            <TextField
            className="form-control"
            onChange={handleChange}
            label="What needs to be done"
            value={label}/>
            <Button type="submit" size="large" color="primary" variant="outlined" className="btn btn-outline-primary fa-pull-right" >Add</Button>
        </form>
        );
};

export default AddItem;