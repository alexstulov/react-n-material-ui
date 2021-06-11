import React, { useState } from "react";
import "./Rapido.scss";
import { FIELD_SIZE, FIELD_CHOICE_LIMIT } from "./constants";
import {
  generateUniqueRandomList,
  generateRandomField,
} from "./helpers/random";
import fetchRetry from "./helpers/fetchRetry";
import getAllIndexes from "./helpers/getAllIndexes";
import Field from "./Field";

interface FieldsType {
  first: number[];
  second: number[];
}

type FieldsNamesType = "first" | "second";

function App() {
  const [fields, setFields] = useState<FieldsType>({
    first: Array(FIELD_SIZE.first).fill(false),
    second: Array(FIELD_SIZE.second).fill(false),
  });
  const [message, setMessage] = useState("");

  const fillFieldsRandomly = () => {
    setFields((fields) =>
      Object.keys(fields).reduce(
        (accum, fieldPrefix) => {
          const currentSize = FIELD_SIZE[fieldPrefix as FieldsNamesType];
          const currentLimit =
            FIELD_CHOICE_LIMIT[fieldPrefix as FieldsNamesType];
          return {
            ...accum,
            [fieldPrefix]: generateRandomField(currentSize, currentLimit),
          };
        },
        { first: [], second: [] }
      )
    );
  };

  const readyToSubmit =
    Object.keys(fields)
      .map(
        (fieldPrefix) =>
          fields[fieldPrefix as FieldsNamesType].filter((item) => item)
            .length === FIELD_CHOICE_LIMIT[fieldPrefix as FieldsNamesType]
      )
      .filter((isTruthy) => !isTruthy).length === 0;

  const onSubmit = () => {
    if (!readyToSubmit) {
      return;
    }

    const comparedChoice = Object.keys(fields).map((fieldPrefix) => {
      const userChoice = getAllIndexes(
        fields[fieldPrefix as FieldsNamesType],
        true
      );

      const randomList = generateUniqueRandomList(
        FIELD_CHOICE_LIMIT[fieldPrefix as FieldsNamesType],
        FIELD_SIZE[fieldPrefix as FieldsNamesType]
      );

      return {
        userChoice: userChoice.map((itemIndex) => itemIndex + 1),
        correctAmount: randomList.filter((itemIndex) =>
          userChoice.includes(itemIndex)
        ).length,
      };
    });

    let result = false;
    if (
      comparedChoice[0].correctAmount >= 4 ||
      (comparedChoice[0].correctAmount >= 3 &&
        comparedChoice[1].correctAmount === 1)
    ) {
      result = true;
    }

    const body = {
      selectedNumber: {
        firstField: comparedChoice[0].userChoice,
        secondField: comparedChoice[1].userChoice,
      },
      isTicketWon: result,
    };
    const url = "http://localhost:8080/example";
    const options = {
      method: "POST",
      body: JSON.stringify(body),
    };
    fetchRetry(url, options, setMessage, 3);
  };

  return (
    <div className="rapido-container">
      <div className="head">
        <h2>Ticket 1</h2>
        <i
          onClick={fillFieldsRandomly}
          className={`magic-stick ${message ? "hidden" : ""}`}
        ></i>
      </div>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <Field
            label={["Field 1", "Mark 8 numbers"]}
            data={fields["first"]}
            setFields={setFields}
            prefix="first"
          />
          <Field
            label={["Field 1", "Mark 8 numbers"]}
            data={fields["second"]}
            setFields={setFields}
            prefix="second"
          />

          <div className="button-wrapper">
            <button
              type="button"
              className="submit-button"
              disabled={!readyToSubmit}
              onClick={onSubmit}
            >
              Show result
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
