import React from "react";

import { useFormik } from "formik";
import "./formik.css";

const FormikExample = () => {
  function validate(values: any) {
    const errors = {
      firstName: '',
      lastName: ''
    };
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    return errors;
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validate,
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <h2>Formik</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
            />
            {errors.firstName ? errors.firstName : null}
          </div>
          <div>
            <input
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
            />
            {errors.lastName ? errors.lastName : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormikExample;
