
import Reac from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/ProfileForm.css'
import { Radio } from '@mui/material';
import { useRadioGroup } from '@mui/material/RadioGroup';
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
          <div className='yesno' role="group" aria-labelledby="my-radio-group">
            <label>
              
              <Field type='radio' name="investments" value="Yes" />
              Yes
            </label>
            <label>
              <Field type='radio' name="investments" value="No" />
              No
            </label>
          </div>
        <div>
        <h3 className='question'>If you do, what are they?</h3>

        <label htmlFor="investmentDiversity">Public Stock Percent</label>
          <Field className="textField" id="investmentDiversity" name="publicStockPercent" placeholder="20" />%

        <label htmlFor="investmentDiversity">Private Stock Percentage</label>
          <Field className="textField" id="investmentDiversity" name="privateStockPercent" placeholder="20" />%

        <label htmlFor="investmentDiversity">Bonds Percentage</label>
          <Field className="textField" id="investmentDiversity" name="bondsPercent" placeholder="20" />%

        <label htmlFor="investmentDiversity">Crypto Percentage</label>
          <Field className="textField" id="investmentDiversity" name="cryptoPercent" placeholder="20" />%

        <label htmlFor="investmentDiversity">Foreign Exchange Percentage</label>
          <Field className="textField" id="investmentDiversity" name="forexPercent" placeholder="20" />%
        </div>
          

          <h3 className='question'>How much are you thinking about investing?</h3>
          <div className='yesno' role="group" aria-labelledby="disposableIncomeBracket">
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="0-5000" />
              Under $5000
            </label>
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="5001-10000" />
              $5000-$10000
            </label>
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="10001-20000" />
              $10001-$20000
            </label>
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="20001-50000" />
              $20001-$50000
            </label>
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="50001-100000" />
              $50001-$100000
            </label>
            <label>
              <Field type="radio" name="disposableIncomeBracket" value="100001-999999" />
              $100001+
            </label>
          </div>

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