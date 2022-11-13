import React from 'react';
import { Radio, FormControlLabel, MenuItem } from '@mui/material';
import { RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import '../styles/ProfileForm.css'


export default function ProfileForm(props) {
  const formik = useFormik({
    initialValues: {
      username: 'Test User',
      currentInvestment: '',
      financialGoal: '',
      disposableIncomeBracket: '',
      emergencyAccess: '',
      liquidityPreference: '',
      investmentLength: '',
      publicStockPercent: '',
      privateStockPercent: '',
      bondsPercent: '',
      cryptoPercent: '',
      forexPercent: '',
    },

    onSubmit: values => {
      props.handler(values);
    },
  });
  return (
    <div className='container'>
    <form onSubmit={formik.handleSubmit}>

      <h3 className='question'>Do you have active investments?</h3>
      <RadioGroup name="currentInvestment" onChange={formik.handleChange} color='primary'>
        <FormControlLabel
          value="Yes"
          control={<Radio color='primary' />}
          label="Yes"
          color='secondary'
        />

        <FormControlLabel
          value="No"
          control={<Radio />}
          label="No"
        />
      </RadioGroup>


      {(formik.values.currentInvestment == "Yes") && 

      <div className='currentInvestmentQuestions'>
      <h3 className='question'>Enter Portfolio Distribution:</h3>
      <TextField
        id="publicStockPercent"
        name="publicStockPercent"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.publicStockPercent}
        helperText="% Public Stocks"
      />
      <TextField
        id="privateStockPercent"
        name="privateStockPercent"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.privateStockPercent}
        helperText="% Private Stocks"
      />
      <TextField
        id="bondsPercent"
        name="bondsPercent"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.bondsPercent}
        helperText="% Government Bonds"
      />
      <TextField
        id="cryptoPercent"
        name="cryptoPercent"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.cryptoPercent}
        helperText="% Cryptocurrency"
      />
      <TextField
        id="forexPercent"
        name="forexPercent"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.forexPercent}
        helperText="% Foreign Currency Exchange"
      />
      </div>}


      <h3 className='question'>How much do you want to invest?</h3>
      <TextField
        fullWidth
        select
        id="disposableIncomeBracket"
        name="disposableIncomeBracket"
        value={formik.values.disposableIncomeBracket}
        helperText="Investment Quantity"
        onChange={formik.handleChange}
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
      </TextField>

      <h3 className='question'>Do you need fast access to cash?</h3>
      <RadioGroup name="emergencyAccess" onChange={formik.handleChange}>
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
      </RadioGroup>


      {((formik.values.emergencyAccess) == "Yes") &&
      <div className='emergencyAccessSection'>
        <h3 className='question'>What percentage of investment would you need access to in case of emergency?</h3>
        <TextField
          id="liquidityPreference"
          name="liquidityPreference"
          type="number"
          placeholder='20'
          onChange={formik.handleChange}
          value={formik.values.liquidityPreference}
          helperText="% Liquid Access"
        />
      </div>}

      <h3 className='question'>How much do you hope to gain?</h3>
      <TextField
        id="financialGoal"
        name="financialGoal"
        type="number"
        placeholder='15'
        onChange={formik.handleChange}
        value={formik.values.financialGoal}
        helperText="% Financial Gain Goal"
      />

      <h3 className='question'>How long are you looking to invest?</h3>
      <TextField
        id="investmentLength"
        name="investmentLength"
        type="number"
        placeholder='4'
        onChange={formik.handleChange}
        value={formik.values.investmentLength}
        helperText="Investment Length (Years)"
      />

      <br />

      <button type="submit" className='submitButton'>Submit</button>
    </form>
    </div>
  );

}