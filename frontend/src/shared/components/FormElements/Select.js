import React from 'react';
import { useField } from 'formik';

import './Select.css'

const Select = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="inputBox">
        <select className="select" {...field} {...props} />
        <label className="label" htmlFor={props.id||props.name}>{props.label}</label>
        {meta.touched && meta.error ? (
          <div className="errorMessage">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  
export default Select;