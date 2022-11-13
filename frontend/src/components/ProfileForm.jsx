
import Reac from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Radio, FormControlLabel, MenuItem } from '@mui/material';
import { RadioGroup, TextField } from '@mui/material';
import '../styles/ProfileForm.css'

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


            <h3 className='question'>Do you have any current investments?</h3>
            <Field component={RadioGroup} name="currentInvestment">
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
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
            <Field
              fullWidth
              select
              component={TextField} 
              id="disposableIncomeBracket"
              value={values.disposableIncomeBracket}
              helperText="Disposable Income Bracket"
              // onChange={handleChange}

            >

              <MenuItem key="10" value="10000">
                $10,000
              </MenuItem>
              {/* JOSH ADD MORE FIELDS HERE */}
              </Field>



          <h3 className='question'>In case of emergency, do you need access to your funds?</h3>
          <div className='yesno' role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="emergencyAccess" value="Yes" />
              Yes
            </label>
            <label>
              <Field type="radio" name="emergencyAccess" value="No" />
              No
            </label>
          </div>


          <div>
          <h3 className='question'> What percentage of investment would you need access to in case of emergency?</h3>
          <label htmlFor="liquidityPreference">Emergency Percent</label>
        <Field className="textField" id="liquidityPreference" name="liquidityPreference" placeholder="25" />%
        </div>

        <div>
          <h3 className='question'>What are your financial goals?</h3>
          <label htmlFor="financialGoal">Growth Percentage</label>
          <Field className="textField" id="financialGoal" name="financialGoal" placeholder="10" />%
        </div>

        <div>
          <h3 className='question'>How long are you looking to invest?</h3>
          <label htmlFor="investmentLength">Investment Length</label>
          <Field className="textField" id="investmentLength" name="investmentLength" placeholder="3" /> Year(s)
        </div>

        <button type="submit" id='submit'>Submit</button>

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