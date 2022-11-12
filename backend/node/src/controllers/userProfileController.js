const userProfiles = require('../models/userProfiles');

const createUserProfile = async (req, res, next) => {

    var newUserProfile = {

        "username": req.body.username,
        "publicStockPercent": parseDouble(req.body.publicStockPercent),
        "privateStockPercent": parseDouble(req.body.privateStockPercent),
        "bondsPercent": parseDouble(req.body.bondsPercent),
        "cryptoPercent": parseDouble(req.body.cryptoPercent),
        "forexPercent": parseDouble(req.body.forexPercent),
        "liquidityPrefrence": req.body.liquidityPrefrence,
        "investmentLength": parseInt(req.body.investmentLength),
        "disposableIncomeBracket": req.body.disposableIncomeBracket,
        "financialGoal": req.body.financialGoal

    };

    await userProfiles.insertUser(newUserProfile);

    res.json({"Status": "Ok"});

}

module.exports = {

    createUserProfile

}
