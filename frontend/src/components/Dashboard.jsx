import React, { useEffect, useState } from "react";
import Header from "./Header";
import '../styles/Dashboard.css'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function Dashboard() {
    const [riskData, setRiskData] = useState(null);
    const [returnData, setReturnData] = useState(null);
    const [recData, setRecData] = useState(null);
    const [ready, setReady] = useState(false);


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
                { y: 18, label: "Savings" },
                { y: 49, label: "Public Stocks" },
                { y: 9, label: "Bonds" },
                { y: 5, label: "Cryptocurrency" },
                { y: 19, label: "Foreign Exchange" }
            ]
        }]
    }

    async function getRisks() {
        let data = await fetch(window.serverURL + '/assets/risks', {
            method: 'GET',
        });

        data = await data.json();
        console.log(data.Stocks.GME);

        // let arr = []

        // for (const [key, value] of Object.entries(data.Stocks)) {
        //     console.log(`${key} -> ${value}`)
        // }

        

        setRiskData(data);
        setReady(true);
    }
    async function getReturns() {
        let data = await fetch(window.serverURL + '/assets/returnRates', {
            method: 'GET',
        });

        data = await data.json();
        // console.log(data.Stocks);
        setReturnData(data);
        setReady(true);
    }
    async function getRec() {
        let data = await fetch(window.serverURL + '/assets/reccomend', {
            method: 'GET',
        });

        data = await data.json();
        // console.log(data.Stocks);
        setRecData(data);
        setReady(true);
    }
    
    useEffect(() => {
        getRisks();
        getReturns();
        getRec();
    }, []);

    return (
    <>
    <Header message="Dashboard" />
    <div className="dashboardElements">
        <div className="chartDiv">
            <h3>Recommended Portfolio Composition</h3>
            <CanvasJSChart options = {options} />
        </div>
        <div className="savingsInfo">
            <h1>Savings</h1>
        </div>
        <div className="stockInfo">
            <h1>Stocks</h1>
            <ul>
                {(ready == 'true') && riskData.Stocks.map((stock) => (
                    <li key={stock}>{stock}</li>
                ))}
            </ul>
        </div>
        <div className="bondInfo">
            <h1>Bonds</h1>
        </div>
        <div className="cryptoInfo">
            <h1>Crypto</h1>
        </div>
        <div className="forexInfo">
            <h1>Forex</h1>
        </div>
    </div>
    </>
    );
}