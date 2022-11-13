const stock = require("../finance/stocks/stocks");

const getIndex = async (req, res, next) => {

    console.log(await stock.getFXReturnRates("EUR"));
    res.json({"Message": "Hello World"});

}

module.exports = {

    getIndex

}
