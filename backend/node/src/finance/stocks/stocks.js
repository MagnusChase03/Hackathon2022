const mongodb = require('../../config/mongodb');
const stats = require('../helpers/stats');

const COMPANIES = ['GME', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']
const CURRENCIES = ['EUR', 'GBP', 'CAD']
const CRYPTO = ['BTC', 'ETH', 'BNB']

const getMarketRates = async () => {

    var returnRates = []
    for (var i = 0; i < COMPANIES.length; i++) {

        returnRates.push(await getReturnRates(COMPANIES[i]));

    }

    var meanReturnRates = []
    for (var i = 0; i < returnRates[0].length; i++) {

        var total = 0.0;
        var num = 0;

        for (var j = 0; j < returnRates.length; j++) {

            total += returnRates[j][i];
            num += 1;

        }

        total /= num;
        meanReturnRates.push(total);

    }

    return meanReturnRates;

}

const getCurrencyRates = async () => {

    var returnRates = []
    for (var i = 0; i < CURRENCIES.length; i++) {

        returnRates.push(await getFXReturnRates(CURRENCIES[i]));

    }

    var meanReturnRates = []
    for (var i = 0; i < returnRates[0].length; i++) {

        var total = 0.0;
        var num = 0;

        for (var j = 0; j < returnRates.length; j++) {

            total += returnRates[j][i];
            num += 1;

        }

        total /= num;
        meanReturnRates.push(total);

    }

    return meanReturnRates;

}

const getCryptoRates = async () => {

    var returnRates = []
    for (var i = 0; i < CRYPTO.length; i++) {

        returnRates.push(await getCryptoReturnRates(CRYPTO[i]));

    }

    var meanReturnRates = []
    for (var i = 0; i < returnRates[0].length; i++) {

        var total = 0.0;
        var num = 0;

        for (var j = 0; j < returnRates.length; j++) {

            total += returnRates[j][i];
            num += 1;

        }

        total /= num;
        meanReturnRates.push(total);

    }

    return meanReturnRates;

}

const getAllCryptoReturnRates = async ()  => {

    returnRates = {};
    for (var i = 0; i < CRYPTO.length; i++) {

        returnRates[CRYPTO[i]] = await getCryptoReturnRates(CRYPTO[i]);

    }

    return returnRates;

}

const getReturnRates = async (company) => {

    var collection = await mongodb.getDB().collection(company);

    var days = []
    var data = await collection.find({}).toArray();
    for (var i = 0; i < data.length; i++) {

        days.push(data[i]);

    } 

    var returnRates = []
    for (var i = 0; i < data.length - 1; i++) {

        var initial = parseFloat(days[i + 1]["4. close"]);
        var final = parseFloat(days[i]["4. close"]);

        returnRates.push((final - initial) / initial);

    }

    return returnRates;

}

const getAllReturnRates = async () => {

    returnRates = {};
    for (var i = 0; i < COMPANIES.length; i++) {

        returnRates[COMPANIES[i]] = await getReturnRates(COMPANIES[i]);

    }

    return returnRates;

}

const getFXReturnRates = async (currency) => {

    var collection = await mongodb.getDB().collection(currency);

    var days = []
    var data = await collection.find({}).toArray();
    for (var i = 0; i < data.length; i++) {

        days.push(data[i]);

    } 

    var returnRates = []
    for (var i = 0; i < data.length - 1; i++) {

        var initial = parseFloat(days[i + 1]["4. close"]);
        var final = parseFloat(days[i]["4. close"]);

        returnRates.push((final - initial) / initial);

    }

    return returnRates;

}

const getAllFXReturnRates = async () => {

    returnRates = {};
    for (var i = 0; i < CURRENCIES.length; i++) {

        returnRates[CURRENCIES[i]] = await getReturnRates(CURRENCIES[i]);

    }

    return returnRates;

}

const getCryptoReturnRates = async (crypto) => {

    var collection = await mongodb.getDB().collection(crypto);

    var days = []
    var data = await collection.find({}).toArray();
    for (var i = 0; i < data.length; i++) {

        days.push(data[i]);

    } 

    var returnRates = []
    for (var i = 0; i < data.length - 1; i++) {

        var initial = parseFloat(days[i + 1]["4b. close (USD)"]);
        var final = parseFloat(days[i]["4b. close (USD)"]);

        returnRates.push((final - initial) / initial);

    }

    return returnRates;

}

const getSharp = async (company) => {

        var returnRates = await getReturnRates(company);
        var mean = stats.mean(returnRates);
        var std = stats.stDev(returnRates, mean);

        return mean / std;

}

const risk = async (company) => {

    var returnRates = await getReturnRates(company);
    var returnRatesMean = stats.mean(returnRates);

    var marketRates = await getMarketRates();
    var marketRatesMean = stats.mean(marketRates);

    var covar = stats.covariance(returnRates, returnRatesMean, marketRates, marketRatesMean);
    var marketVar = stats.variance(marketRates, marketRatesMean);

    return covar / marketVar;

}

const riskFX = async (currency) => {

    var returnRates = await getFXReturnRates(currency);
    var returnRatesMean = stats.mean(returnRates);

    var marketRates = await getCurrencyRates();
    var marketRatesMean = stats.mean(marketRates);

    var covar = stats.covariance(returnRates, returnRatesMean, marketRates, marketRatesMean);
    var marketVar = stats.variance(marketRates, marketRatesMean);

    return covar / marketVar;

}

const riskCrypto = async (crypto) => {

    var returnRates = await getCryptoReturnRates(crypto);
    var returnRatesMean = stats.mean(returnRates);

    var marketRates = await getCryptoRates();
    var marketRatesMean = stats.mean(marketRates);

    var covar = stats.covariance(returnRates, returnRatesMean, marketRates, marketRatesMean);
    var marketVar = stats.variance(marketRates, marketRatesMean);

    return covar / marketVar;

}

const getAllRisk = async () => {

    risks = {};
    for (var i = 0; i < COMPANIES.length; i++) {

        risks[COMPANIES[i]] = await risk(COMPANIES[i]);

    }

    return risks;

}

const getAllFXRisk = async () => {

    risks = {};
    for (var i = 0; i < CURRENCIES.length; i++) {

        risks[CURRENCIES[i]] = await riskFX(CURRENCIES[i]);

    }

    return risks;

}

const getAllCryptoRisk = async () => {

    risks = {};
    for (var i = 0; i < CRYPTO.length; i++) {

        risks[CRYPTO[i]] = await riskCrypto(CRYPTO[i]);

    }

    return risks;

}

module.exports = {

    getMarketRates,
    getCurrencyRates,
    getCryptoRates,
    getReturnRates,
    getFXReturnRates,
    getCryptoReturnRates,
    getSharp,
    risk,
    riskFX,
    riskCrypto,
    getAllRisk,
    getAllFXRisk,
    getAllCryptoRisk,
    getAllFXReturnRates,
    getAllReturnRates,
    getAllCryptoReturnRates

}