import React from "react";
import { useCookies } from "react-cookie";
import '../styles/Header.css';

export default function Header(props) {
    const [cookies, setCookies] = useCookies(['loggedIn', 'username', 'profileComplete']);
    return (
        <>
            <header className="siteHeader">
                <section className="navbar">
                    <div className="leftEdge"><h2 className="siteTitle">HackUTD IX</h2></div>
                    <div className="centerEdge"><h2 className="centerText">{props.message}</h2></div>
                    <div className="rightEdge">
                        {cookies.loggedIn == "true" && <>
                            <button className="logoutButton" onClick={() => { 
                                setCookies('loggedIn', false, [{ path: '/' }, { sameSite: 'Lax' }]);
                                setCookies('username', null, [{ path: '/' }, { sameSite: 'Lax' }]);
                                setCookies('profileComplete', false, [{ path: '/' }, { sameSite: 'Lax' }])
                        
                        }}>LOGOUT</button>
                        <h3 className="username">{cookies.username}</h3>
                        </>}
                    </div>
                </section>

            </header>
        </>
    );
}