
import React from 'react';
import './search-panel.css';
import { TextField } from '@material-ui/core';

type SearchPanelType = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    query: string
};

const SearchPanel = ({ onChange, query }: SearchPanelType) => {
    const searchText = 'Type here to search';
    const searchStyle = {
        fontSize: '16px'
    };
    return (<div>
        <TextField
            style={searchStyle}
            className="form-control search-input"
            disabled={false}
            onChange={onChange}
            value={query}
            label={searchText}/>
    </div>);
};

export default SearchPanel;