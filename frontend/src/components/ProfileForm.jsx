
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Radio, FormControlLabel, MenuItem } from '@mui/material';
import { RadioGroup, TextField } from '@mui/material';
// import {createTheme} from '@mui/material/styles';
import '../styles/ProfileForm.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';


let theme = createTheme({
  palette: {
    primary: {
      main: '#1ce1ce',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});


export default function ProfileForm(props) {
 
    return (
      
      <Formik
      initialValues={{
        investments: '',
        disposableIncomeBracket: '',
        emergencyAccess: '',
        liquidityPreference: '',
        investmentLength: ''
        
      }}
      onSubmit={async (values) => {
        props.handler(values);
      }}
    >

      {({ values }) => (
        
        
        <Form id='form'>

<ThemeProvider theme={theme}>

            <h3 className='question'>Do you have any current investments?</h3>
            <Field component={RadioGroup} name="currentInvestment">
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                color='primary'
              />
             
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                color='primary'
              />
            </Field>

            <h3 className='question'>If you do, what are they?</h3>
            <TextField
              fullWidth
              id="publicStockPercent"
              name="publicStockPercent"
              label="% Public Stocks"
              placeholder='20'
              value={values.publicStockPercent}
            />
            <TextField
              fullWidth
              id="privateStockPercent"
              name="privateStockPercent"
              label="% Private Stocks"
              placeholder='20'
              value={values.privateStockPercent}
            />
            <TextField
              fullWidth
              id="bondsPercent"
              name="bondsPercent"
              label="% Government Bonds"
              placeholder='20'
              value={values.bondsPercent}
            />
            <TextField
              fullWidth
              id="cryptoPercent"
              name="cryptoPercent"
              label="% Cryptocurrency"
              placeholder='20'
              value={values.cryptoPercent}
            />
            <TextField
              fullWidth
              id="forexPercent"
              name="forexPercent"
              label="% Foreign Exchange"
              placeholder='20'
              value={values.forexPercent}
            />
          

          <h3 className='question'>How much are you thinking about investing?</h3>
            <TextField
              fullWidth
              select
              // component={TextField} 
              id="disposableIncomeBracket"
              value={values.disposableIncomeBracket}
              helperText="Disposable Income Bracket"
              onChange={console.log(values.disposableIncomeBracket)}

            >

              <MenuItem key="10" value="0-5000">
                Under $5,000
              </MenuItem>
              <MenuItem key="10" value="5000-10000">
                $5,000 - $10,000
              </MenuItem>
              <MenuItem key="10" value="10001-20000">
                $10,001 - $20,000 
              </MenuItem>
              <MenuItem key="10" value="20001-50000">
                $20,001 - $50,000
              </MenuItem>
              <MenuItem key="10" value="50001-100000">
                $50,001 - $100,000
              </MenuItem>
              <MenuItem key="10" value="100000-999999">
                More than $100,000
              </MenuItem>
              </Field>



          <h3 className='question'>In case of emergency, do you need access to your funds?</h3>
          <Field component={RadioGroup} name="emergencyAccess">
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                color='primary'

              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                color='primary'

              />
            </Field>


          <h3 className='question'> What percentage of investment would you need access to in case of emergency?</h3>
          <TextField
              fullWidth
              id="liquidityPreference"
              name="liquidityPreference"
              label="% Liquidity Preference"
              placeholder='20'
              value={values.liquidityPreference}
            />

          <h3 className='question'>What are your financial goals?</h3>
          <TextField
              fullWidth
              id="financialGoal"
              name="financialGoal"
              label="% Financial Goal"
              placeholder='20'
              value={values.financialGoal}
            />

          <h3 className='question'>How long are you looking to invest?</h3>
          <TextField
              fullWidth
              id="investmentLength"
              name="investmentLength"
              label="% Investment Length"
              placeholder='20'
              value={values.investmentLength}
            />

        <button type="submit" id='submit'>Submit</button>
        </ThemeProvider>

        </Form>
      )}
    </Formik>
    );
}
// Do you have any current investments? y/n
// if you do what are they? return json object with all investments and percentages invested
// how much money are you thinking of investing? return something that indicates the bracket of investment that we can use.
// In case of emergency will you need access to your investments? yes/no
// what percentage of your investment do you need access to in case of an emergency? integer representing the percentage
// What is your financial goal? percentage of growth as int
// How long are you looking to invest? date time object or something

// var newUserProfile = {
//   "username": req.body.username,
//   "publicStockPercent": parseDouble(req.body.publicStockPercent),
//   "privateStockPercent": parseDouble(req.body.privateStockPercent),
//   "bondsPercent": parseDouble(req.body.bondsPercent),
//   "cryptoPercent": parseDouble(req.body.cryptoPercent),
//   "forexPercent": parseDouble(req.body.forexPercent),
//   "liquidityPrefrence": req.body.liquidityPrefrence,
//   "investmentLength": parseInt(req.body.investmentLength),
//   "disposableIncomeBracket": req.body.disposableIncomeBracket,
//   "financialGoal": req.body.financialGoal
//   };