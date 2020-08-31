import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./formik.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
});

const FormikWithYup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
  };
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <h2>Formik with Yup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, errors, values }) => (
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
        )}
      </Formik>
    </>
  );
};

export default FormikWithYup;
