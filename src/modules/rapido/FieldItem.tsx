import React from "react";

const FieldItem = ({ fieldItem, fieldItemIndex, handleClick }: any) => {
  return (
    <div
      className={`field__item ${!!fieldItem ? "active" : ""}`}
      onClick={handleClick}
    >
      <span>{fieldItemIndex + 1}</span>
    </div>
  );
};

export default FieldItem;
