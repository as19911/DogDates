import React from 'react';
import { useField } from 'formik';

import './TextInput.css';


const TextInput = ({...props}) => {
    const [field, meta] = useField(props);
    return (
      <React.Fragment>
        <div className="text-inputBox">
          <input className="text-input" {...field} {...props}/>
          <label className="text-label" htmlFor= {props.id || props.name}>{props.label}</label>
          {meta.touched && meta.error ? (
            <div className="text-errorMessage">{meta.error}</div>
          ) : null}
        </div>
      </React.Fragment>
    );
};

export default TextInput;
