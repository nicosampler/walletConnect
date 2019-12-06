import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Form = props => {
  return (
    <Formik
      initialValues={{ supply: '' }}
      validationSchema={Yup.object().shape({
        supply: Yup.string().required('Required')
      })}
      onSubmit={(values, actions) => {
        props.onSupplySai(values.supply);
        actions.resetForm();
      }}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <label htmlFor="supply" style={{ display: 'block' }}>
            Supply
          </label>
          <input
            id="supply"
            type="text"
            value={props.values.supply}
            onChange={props.handleChange}
          />
          {props.errors.supply && props.touched.supply && (
            <div>{props.errors.supply}</div>
          )}

          <button type="submit" disabled={props.isSubmitting}>
            Supply SAI
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
