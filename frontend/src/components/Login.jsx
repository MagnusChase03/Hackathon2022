import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../styles/Login.css'


export default function Login(props) {

    return(
        <div className='authContainer'>

   
        <h3>Please Login</h3>
        <Formik
            // Initial values for fields
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values) => { props.handler(values) }}
        >
                <Form className="authForm">
                    <Field id="email" name="email" placeholder="user@example.com" type="email" />
                    <Field id="password" name="password" placeholder="Password" type="password" />
                    <button type="submit" className="loginButton">Login</button>
                </Form>
        </Formik>
        </div>
    );
}