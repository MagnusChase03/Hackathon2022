/*

*/

import { React, useState } from 'react';
import Header from '../components/Header';
import  NewForm from '../components/NewForm';
import '../styles/Home.css';

export default function Home() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dataReady, setDataReady] = useState(false);

    async function handleFormSubmission(values) {
        setFormSubmitted(true);

        // window.username = values.username
        window.username = "Test User"

        const userObject = {
            'username': "Test User",
            'publicStockPercent': values.publicStockPercent,
            'privateStockPercent': values.privateStockPercent,
            'bondsPercent': values.bondsPercent,
            'cryptoPercent': values.cryptoPercent,
            'forexPercent': values.forexPercent,
            'liquidityPrefrence': values.liquidityPreference,
            'investmentLength': values.investmentLength,
            'disposableIncomeBracket': values.disposableIncomeBracket,
            'financialGoal': values.financialGoal,
        }

        let data = await fetch(window.serverURL + '/userProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(userObject)
        });

        data = await data.json();
        if (data.Status == "Ok") {
            setDataReady(true);
        }
    }

    return(
        <div className='homeDiv'>
            <Header message="Investment Buddy"/>
            {(!formSubmitted) && <NewForm handler={handleFormSubmission} />}

            {formSubmitted && !dataReady && <h1>LOADING...</h1>}
            {formSubmitted && dataReady && <h1>DATA</h1>}
        </div>
    );
}