const stocks = require('../finance/stocks/stocks');

const getRisks = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllRisk(), "FX": await stocks.getAllFXRisk() , "Crypto": await stocks.getAllCryptoRisk()});

}

const getReturnRates = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllReturnRates(), "FX": await stocks.getAllFXReturnRates() , "Crypto": await stocks.getAllCryptoReturnRates()});

}

module.exports = {

    getRisks,
    getReturnRates

}
