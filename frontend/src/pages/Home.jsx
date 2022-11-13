/*

*/

import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import Header from '../components/Header';
import ProfileForm from '../components/ProfileForm';
import Login from '../components/Login';
import '../styles/Home.css';
import Dashboard from '../components/Dashboard';

export default function Home() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [cookies, setCookies] = useCookies(['loggedIn', 'username', 'profileComplete']);


    async function handleLogin(values) {
        console.log(values);
        setCookies('loggedIn', true, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('username', values.email, [{ path: '/' }, { sameSite: 'Lax' }]);
        console.log(cookies.username)
    }

    async function handleFormSubmission(values) {
        setFormSubmitted(true);

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
            setCookies('profileComplete', true, [{ path: '/' }, { sameSite: 'Lax' }]);
        }

    }

    if ((cookies.loggedIn == "true") && (cookies.profileComplete == "true")) {
        return(
            <div className='homeDiv'>
                <Dashboard />
            </div>
        );
    }

    else if (cookies.loggedIn == "true") {
        return(
            <>
            <Header message="Investment Buddy" />
            { (!formSubmitted) && <ProfileForm handler={handleFormSubmission} /> }
            { formSubmitted && !dataReady && <h1>LOADING...</h1> }
            </>
        );
    }

    else {
        return(
            <>
                <Header message="Investment Buddy" />
                <Login handler={handleLogin} />
            </>
        );
    }

}