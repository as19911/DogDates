import React from 'react';
import { useField } from 'formik';

import './Select.css'

const Select = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="select-inputBox">
        <select className="select-input" {...field} {...props} />
        <label className="select-label" htmlFor={props.id||props.name}>{props.label}</label>
        {meta.touched && meta.error ? (
          <div className="select-errorMessage">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  
export default Select;