/*

*/

import { React, Suspense, useState, lazy } from 'react';
import Header from '../components/Header';
import ProfileForm from '../components/ProfileForm';

export default function Home() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dataReady, setDataReady] = useState(false);

    async function handleFormSubmission(values) {
        setFormSubmitted(true);


        const userObject = {
            'username': "Test User",
            'publicStockPercent': values.publicStockPercent,
            'privateStockPercent': values.privateStockPercent,
            'bondsPercent': values.bondsPercent,
            'cryptoPercent': values.cryptoPercent,
            'forexPercent': values.forexPercent,
            'liquidityPrefrence': values.liquidityPrefrence,
            'investmentLength': values.investmentLength,
            'disposableIncomeBracket': values.disposableIncomeBracket,
            'financialGoal': values.financialGoal,
        }

        data = await fetch(window.serverURL + '/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'userName': 'test@gmail.com',
                'password': 'Password!',
                'grant_type': 'password'
            })
        });

        data = await data.json();
        console.log(data);
        setDataReady(true);
    }

    return(
        <div className='homeDiv'>
            <Header />
            {(!formSubmitted) && <ProfileForm handler={handleFormSubmission} />}

            {formSubmitted && !dataReady && <h1>LOADING...</h1>}
            {formSubmitted && dataReady && <h1>DATA</h1>}
        </div>
    );
}