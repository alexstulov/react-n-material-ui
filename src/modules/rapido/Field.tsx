import React from "react";
import { FIELD_CHOICE_LIMIT } from "./constants";
import FieldItem from "./FieldItem";

interface FieldPropsType {
  label: string[];
  data: number[];
  setFields: any;
  prefix: "first" | "second";
}

const Field = ({ label, data, setFields, prefix }: FieldPropsType) => {
  const wrapSetFields = (index: number) =>
    setFields((fields: any) => {
      const currentField = fields[prefix];
      const isLimitReached =
        currentField.filter((item: any) => item).length ===
        FIELD_CHOICE_LIMIT[prefix];

      let newValue = !currentField[index];
      if (isLimitReached && !currentField[index]) {
        newValue = false;
      }

      return {
        ...fields,
        [prefix]: [
          ...currentField.slice(0, index),
          newValue,
          ...currentField.slice(index + 1),
        ],
      };
    });

  const generateFieldItemsMarkup = () =>
    data.map((item, index) => (
      <FieldItem
        key={index}
        fieldItem={item}
        fieldItemIndex={index}
        handleClick={() => wrapSetFields(index)}
      />
    ));

  return (
    <>
      <p>
        {label[0]} <span>{label[1]}</span>
      </p>
      <div id={`${prefix}Field`} className="field">
        {generateFieldItemsMarkup()}
      </div>
    </>
  );
};

export default Field;
