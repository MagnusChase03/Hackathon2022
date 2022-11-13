import React from "react";
import '../styles/Header.css';

export default function Header(props) {
    return (
        <>
            <header className="siteHeader">
                <section className="navbar">
                    <div className="leftEdge"><h2 className="siteTitle">HackUTD IX</h2></div>
                    {/* THE BELOW LINE CAN BE USED FOR THE CENTER TITLE */}
                    <div className="centerEdge"><h2 className="centerText">PLACEHOLDER</h2></div>
                    <div className="rightEdge">
                        <button className="logoutButton" onClick={() => { alert("LOGGED OUT") }}>LOGOUT</button>
                        <h3 className="username" >USERNAME</h3>
                    </div>
                </section>

            </header>
        </>
    );
}