import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Radio, FormControlLabel, MenuItem } from '@mui/material';
import { RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import '../styles/ProfileForm.css'

export default function NewForm(props) {
    const formik = useFormik({
        initialValues: {
            username: '',
            investments: '',
            disposableIncomeBracket: '',
            emergencyAccess: '',
            liquidityPreference: '',
            investmentLength: ''
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (

        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="firstName">First Name</label>

            <TextField
              fullWidth
              select
              id="disposableIncomeBracket"
              name="disposableIncomeBracket"
              value={formik.values.disposableIncomeBracket}
              helperText="Disposable Income Bracket"
              onChange={formik.handleChange}
            >
                <MenuItem key={"10"} value={"10000"}    >
                $10,000
              </MenuItem>
              {/* JOSH ADD MORE FIELDS HERE */}
              </TextField>

            <TextField
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />

            <label htmlFor="lastName">Last Name</label>

            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />

            <label htmlFor="email">Email Address</label>

            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <button type="submit">Submit</button>

        </form>

    );

}