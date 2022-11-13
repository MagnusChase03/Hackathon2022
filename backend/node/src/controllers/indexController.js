const stock = require("../finance/stocks/stocks");

const getIndex = async (req, res, next) => {

    console.log(await stock.risk("GME"));
    res.json({"Message": "Hello World"});

}

module.exports = {

    getIndex

}
