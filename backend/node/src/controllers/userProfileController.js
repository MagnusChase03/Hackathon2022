const userProfiles = require('../models/userProfiles');

const getUserProfile = async (req, res, next) => {

    var user = await userProfiles.getUser(req.headers.username);

    // GET USER PROFILE RISK RATING

    res.json({"Status": "Ok", "User": user});

}

const createUserProfile = async (req, res, next) => {

    var newUserProfile = {

        "username": req.body.username,
        "publicStockPercent": parseFloat(req.body.publicStockPercent),
        "privateStockPercent": parseFloat(req.body.privateStockPercent),
        "bondsPercent": parseFloat(req.body.bondsPercent),
        "cryptoPercent": parseFloat(req.body.cryptoPercent),
        "forexPercent": parseFloat(req.body.forexPercent),
        "liquidityPrefrence": req.body.liquidityPrefrence,
        "investmentLength": parseInt(req.body.investmentLength),
        "disposableIncomeBracket": req.body.disposableIncomeBracket,
        "financialGoal": req.body.financialGoal

    };

    await userProfiles.insertUser(newUserProfile);

    res.json({"Status": "Ok"});

}

module.exports = {

    getUserProfile,
    createUserProfile

}
