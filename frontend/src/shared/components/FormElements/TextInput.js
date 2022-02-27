import React from 'react';
import { useField } from 'formik';

import './TextInput.css';


const TextInput = ({...props}) => {
    const [field, meta] = useField(props);
    return (
      <React.Fragment>
        <div className="inputBox">
          <input className="input" {...field} {...props}/>
          <label className="label" htmlFor= {props.id || props.name}>{props.label}</label>
          {meta.touched && meta.error ? (
            <div className="errorMessage">{meta.error}</div>
          ) : null}
        </div>
      </React.Fragment>
    );
};

export default TextInput;
