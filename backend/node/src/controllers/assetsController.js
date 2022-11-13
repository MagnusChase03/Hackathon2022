const stocks = require('../finance/stocks/stocks');

const getRisks = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllRisk(), "FX": await stocks.getAllFXRisk() , "Crypto": await stocks.getAllCryptoRisk()});

}

const getReturnRates = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllReturnRates(), "FX": await stocks.getAllFXReturnRates() , "Crypto": await stocks.getAllCryptoReturnRates()});


}
const getReccomend = async (req, res, next) => {

    var stockRisk = await stocks.getAllRisk();
    
    var smallest = 100000;
    var smallestCompany = "";
    for (var key in stockRisk) {

        if (stockRisk[key] < smallest) {
            smallest = stockRisk[key];
            smallestCompany = key;
        }

    }

    var obj = {};
    obj[smallestCompany] = smallest;

    var riskFX = await stocks.getAllFXRisk();
    
    smallest = 100000;
    smallestCompany = "";
    for (var key in riskFX) {

        if (riskFX[key] < smallest) {
            smallest = riskFX[key];
            smallestCompany = key;
        }

    }

    var obj2 = {};
    obj2[smallestCompany] = smallest;

    var cryptoRisk = await stocks.getAllCryptoRisk();
    
    smallest = 100000;
    smallestCompany = "";
    for (var key in cryptoRisk) {

        if (cryptoRisk[key] < smallest) {
            smallest = cryptoRisk[key];
            smallestCompany = key;
        }

    }

    var obj3 = {};
    obj3[smallestCompany] = smallest;

    res.json({"Stocks": obj, "FX": obj2, "Crypto": obj3});

}

module.exports = {

    getRisks,
    getReturnRates,
    getReccomend

}
