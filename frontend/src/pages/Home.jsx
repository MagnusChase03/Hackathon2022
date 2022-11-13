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
    const [cookies, setCookies] = useCookies(['loggedIn', 'username', 'profileComplete', 'userData', 'savings', 'publicStockPercent', 'bondsPercent', 'cryptoPercent', 'forexPercent']);
    const [userData, setUserData] = useState(null);


    async function handleLogin(values) {
        console.log(values);
        setCookies('loggedIn', true, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('username', values.email, [{ path: '/' }, { sameSite: 'Lax' }]);
        console.log(cookies.username)
    }

    async function handleFormSubmission(values) {
        setFormSubmitted(true);

        const userObject = {
            'username': values.username,
            'currentInvestment': values.currentInvestment,
            'financialGoal': values.financialGoal,
            'disposableIncomeBracket': values.disposableIncomeBracket,
            'emergencyAccess': values.emergencyAccess,
            'liquidityPreference': values.liquidityPreference,
            'investmentLength': values.investmentLength,
            'publicStockPercent': values.publicStockPercent,
            'savings': values.savings,
            'bondsPercent': values.bondsPercent,
            'cryptoPercent': values.cryptoPercent,
            'forexPercent': values.forexPercent,
            'riskLevel': values.riskLevel,
        }
        setUserData(userObject);

        setCookies('savings', userObject.savings, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('publicStockPercent', userObject.publicStockPercent, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('bondsPercent', userObject.bondsPercent, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('cryptoPercent', userObject.cryptoPercent, [{ path: '/' }, { sameSite: 'Lax' }]);
        setCookies('forexPercent', userObject.forexPercent, [{ path: '/' }, { sameSite: 'Lax' }]);

        let data = await fetch(window.serverURL + '/userProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(userObject)
        });

        setDataReady(true);
        setCookies('profileComplete', true, [{ path: '/' }, { sameSite: 'Lax' }]);
        data = await data.json();
        // // if (data.Status == "Ok") {
        // setDataReady(true);
        // setCookies('profileComplete', true, [{ path: '/' }, { sameSite: 'Lax' }]);
        // }

    }

    if ((cookies.loggedIn == "true") && (cookies.profileComplete == "true")) {
        return(
            <div className='homeDiv'>
                <Dashboard userData={userData}/>
            </div>
        );
    }

    else if (cookies.loggedIn == "true") {
        return(
            <>
            <Header message="Riskalyze" />
            { (!formSubmitted) && <ProfileForm handler={handleFormSubmission} /> }
            { formSubmitted && !dataReady && <h1>LOADING...</h1> }
            </>
        );
    }

    else {
        return(
            <>
                <Header message="Riskalyze" />
                <Login handler={handleLogin} />
            </>
        );
    }

}