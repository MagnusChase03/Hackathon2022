
import Reac from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
        <Form>
          <h3>Do you have any current investments?</h3>
          <div id="my-radio-group">Picked</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="investments" value="Yes" />
              Yes
            </label>
            <label>
              <Field type="radio" name="investments" value="No" />
              No
            </label>
            <div>Picked: {values.investments}</div>
          </div>


          <h3>How much are you thinking about investing?</h3>
          <div id="disposableIncomeBracket">Picked</div>
          <div role="group" aria-labelledby="disposableIncomeBracket">
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
            <div>Picked: {values.disposableIncomeBracket}</div>
          </div>

          <h3>In case of emergency, do you need access to your funds?</h3>
          <div id="my-radio-group">Picked</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="emergencyAccess" value="Yes" />
              Yes
            </label>
            <label>
              <Field type="radio" name="emergencyAccess" value="No" />
              No
            </label>
            <div>Picked: {values.emergencyAccess}</div>
          </div>


          <div>
          <h3>What percentage of investment would you need access to in case of emergency?</h3>
          <label htmlFor="liquidityPreference">Emergency Percent</label>
        <Field id="liquidityPreference" name="liquidityPreference" placeholder="25" />%
        </div>

        <div>
          <h3>What are your financial goals?</h3>
          <label htmlFor="financialGoal">Growth Percentage</label>
          <Field id="financialGoal" name="financialGoal" placeholder="10" />%
        </div>

        <div>
          <h3>How long are you looking to invest?</h3>
          <label htmlFor="investmentLength">Investment Length</label>
          <Field id="investmentLength" name="investmentLength" placeholder="3" />Year(s)
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