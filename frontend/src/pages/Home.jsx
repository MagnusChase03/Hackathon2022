/*

*/

import { React } from 'react';
import Header from '../components/Header';
import ProfileForm from '../components/ProfileForm';

export default function Home() {

    return(
        <div className='homeDiv'>
            <Header />
            <ProfileForm />
            <h1>WELCOME</h1>
        </div>
    );
}