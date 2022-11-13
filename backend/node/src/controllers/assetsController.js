const stocks = require('../finance/stocks/stocks');

const getAssets = async (req, res, next) => {

    res.json({"Stocks": await stocks.getAllRisk(), "FX": await stocks.getAllFXRisk() });

}

module.exports = {

    getAssets

}
