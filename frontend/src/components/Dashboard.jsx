import React, { useEffect, useState } from "react";
import Header from "./Header";
import '../styles/Dashboard.css'
import CanvasJSReact from '../assets/canvasjs.react';
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function Dashboard(props) {
    const [riskData, setRiskData] = useState(null);
    const [returnData, setReturnData] = useState(null);
    const [recData, setRecData] = useState(null);
    const [ready, setReady] = useState('false');
    const [cookies, setCookies] = useCookies(['loggedIn', 'username', 'profileComplete', 'userData', 'savings', 'publicStockPercent', 'bondsPercent', 'cryptoPercent', 'forexPercent']);

    const options = {
        exportEnabled: false,
        animationEnabled: true,
        backgroundColor: "#242424",
        theme: "dark1",
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 13,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: parseFloat(cookies.savings) , label: "Savings" },
                { y: parseFloat(cookies.publicStockPercent), label: "Public Stocks" },
                { y: parseFloat(cookies.bondsPercent), label: "Bonds" },
                { y: parseFloat(cookies.cryptoPercent), label: "Cryptocurrency" },
                { y: parseFloat(cookies.forexPercent), label: "Foreign Exchange" }
            ]
        }]
    }


    async function getRisks() {
        let data = await fetch(window.serverURL + '/assets/risks', {
            method: 'GET',
        });

        data = await data.json();
        setRiskData(data);
        setReady('true');
    }
    async function getReturns() {
        let data = await fetch(window.serverURL + '/assets/returnRates', {
            method: 'GET',
        });

        data = await data.json();
        setReturnData(data);
        setReady(true);
    }
    async function getRec() {
        let data = await fetch(window.serverURL + '/assets/reccomend', {
            method: 'GET',
        });

        data = await data.json();
        setRecData(data);
        setReady(true);
    }

    return (
    <>
    <Header message="Dashboard" />
    <div className="dashboardElements">
        <div className="chartDiv">
            <h3>Portfolio Composition</h3>
            <CanvasJSChart options = {options} />
        </div>
        <div className="stockInfo">
            <h1>Stocks</h1>
            <Button onClick={() => {getRisks()}} >Fetch Recommendations</Button>
                {(ready == 'true') && riskData.Stocks.map((stock) => (
                    <div key={stock.company}>
                        <p className="companyTicker">Ticker: {stock.company}</p>
                        <p className="companyRisk">Risk Level: {stock.risk}</p>
                    </div>
                ))}
        </div>
        <div className="cryptoInfo">
            <h1>Crypto</h1>
                    <Button onClick={() => { getRisks() }} >Fetch Recommendations</Button>
                    {(ready == 'true') && riskData.Crypto.map((stock) => (
                        <div key={stock.company}>
                            <p className="companyTicker">Ticker: {stock.company}</p>
                            <p className="companyRisk">Risk Level: {stock.risk}</p>
                        </div>
                    ))}
        </div>
        <div className="forexInfo">
            <h1>Forex</h1>
                    <Button onClick={() => { getRisks() }} >Fetch Recommendations</Button>
                    {(ready == 'true') && riskData.FX.map((stock) => (
                        <div key={stock.company}>
                            <p className="companyTicker">Ticker: {stock.company}</p>
                            <p className="companyRisk">Risk Level: {stock.risk}</p>
                        </div>
                    ))}
        </div>
    </div>
    </>
    );
}