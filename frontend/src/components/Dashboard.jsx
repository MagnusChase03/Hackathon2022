import React from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import '../styles/Dashboard.css';

export default function Dashboard() {
    const [cookies, setCookies] = useCookies(['loggedIn', 'username']);
    return(
        <>
        <Header/>
            <h1>DASHBOARD</h1>
        </>
    );
}