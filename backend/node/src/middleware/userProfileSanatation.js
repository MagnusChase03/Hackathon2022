const sanatize = (req, res, next) => {

    if (req.body.username == null
        || req.body.publicStockPercent == null || req.body.privateStockPercent == null || req.body.bondsPercent == null
        || req.body.cryptoPercent == null || req.body.forexPercent == null || req.body.liquidityPrefrence == null
        || req.body.investmentLength == null || req.body.disposableIncomeBracket == null || req.body.financialGoal == null) {

        res.redirect('/teapot');

    } else {

        next();

    }

}

module.exports = {

    sanatize

}
