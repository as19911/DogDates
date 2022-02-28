import React, { useState } from 'react';
import { render } from 'react-dom';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';

import './Signup.css'
import TextInput from '../../shared/components/FormElements/TextInput';
import Select from '../../shared/components/FormElements/Select';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import axios from 'axios';

const Signup = ( ) => {

  const signupSubmitHandler = async (values) => {
    console.log(JSON.stringify(values, null, 6));
    console.log({ 
      fileName: values.image.name, 
      type: values.image.type,
      size: `${values.image.size} bytes`
    })

    //Call backend API
    const FormData = require('form-data');

    const formData = new FormData();
    formData.append('email', values.email);

    const httpRes = await axios.post('http://localhost:5000/api/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(httpRes);

  };

  return (
    <React.Fragment>
      <div className="formHolder">
        <Formik

        //form data schema
          initialValues={{
            email:'',
            password:'',
            ownerName:'',
            dogName:'',
            city:'',
            description:'',
            image:''
          }} 

          //input validation
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            ownerName: Yup.string().required('Required'),
            dogName: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            image: Yup.mixed().test(
              "File Size", 
              "File is too large", 
              (value) => { return (value&&value.size <= 1048576);}
            )
          })}
          onSubmit={signupSubmitHandler} 
        >

          {({ errors, touched, setFieldValue }) => (
            //sign up form
            <Form className="form">
              <h1 className="title">Sign up</h1>
              <TextInput name="email" label="Email" type="text"/>
              <TextInput name="password" label="Password" type="password"/>
              <TextInput name="ownerName" label="My Name" type="text"/>
              <TextInput name="dogName" label="My Puppy's Name" type="text"/>
              <Select name="city" label="City">
                <option value="">Select A City</option>
                <option value="Winnipeg">Winnipeg</option>
                <option value="Toronto">Toronto</option>
              </Select>
              <TextInput name="description" label="About Me And My Puppy" type="text"/>
              <ImageUpload 
                name="image"
                id="image" 
                label="Upload A Picture Of You With Your Puppy"
                onInput={
                  (id, pickedFile, fileIsValid) => {setFieldValue("image", pickedFile);}
                }
                errorText=" "
              />
              {touched.image && errors.image ? (<div className="errorMessage">{errors.image}</div>) : null}
              <input type="submit" className="signupBtn" value="Sign up"/>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};


export default Signup; 










{/* <input className="imageUpload" name="image" type="file" onChange={(event) => {
  setFieldValue("image", event.currentTarget.files[0]);}}/>
<label className="label">Upload A Picture Of You With Your Puppy</label>
{touched.image && errors.image ? (<div className="errorMessage">{errors.image}</div>) : null} */}