import React from "react";
import "./search-panel.css";
import { FormGroup, Input } from "reactstrap";

type SearchPanelType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

const SearchPanel = ({ onChange, query }: SearchPanelType) => {
  const searchText = "Type here to search";
  return (
    <FormGroup>
      <Input
        type="text"
        name="search"
        id="search"
        className="form-control search-input"
        disabled={false}
        onChange={onChange}
        value={query}
        placeholder={searchText}
      />
    </FormGroup>
  );
};

export default SearchPanel;
