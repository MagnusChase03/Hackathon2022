const stocks = require('../finance/stocks/stocks');

const getAssets = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllRisk(), "FX": await stocks.getAllFXRisk() , "Crypto": await stocks.getAllCryptoRisk()});

}

module.exports = {

    getAssets

}
