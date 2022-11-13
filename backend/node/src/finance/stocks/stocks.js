const mongodb = require('../../config/mongodb');
const stats = require('../helpers/stats');

const COMPANIES = ['GME', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']
const CURRENCIES = ['EUR', 'GBP', 'CAD']

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

const risk = async (company) => {

    var returnRates = await getReturnRates(company);
    var returnRatesMean = stats.mean(returnRates);
    console.log(returnRates);
    console.log(returnRatesMean);

    var marketRates = await getMarketRates();
    var marketRatesMean = stats.mean(marketRates);

    var covar = stats.covariance(returnRates, returnRatesMean, marketRates, marketRatesMean);
    var marketVar = stats.variance(marketRates, marketRatesMean);

    return covar / marketVar;

}

// def riskFX(currency):
//     currecnyReturnRates = getFXReturnRates(currency)
//     currecnyReturnRatesMean = getMean(currecnyReturnRates)

//     marketRates = getCurrenyRates()
//     marketRatesMean = getMean(marketRates)

//     topCov = cov(currecnyReturnRates, currecnyReturnRatesMean, marketRates, marketRatesMean)
//     marketVariance = getVar(marketRates, marketRatesMean)

//     return topCov / marketVariance

const riskFX = async (currency) => {

    var returnRates = await getFXReturnRates(currency);
    var returnRatesMean = stats.mean(returnRates);
    console.log(returnRates);
    console.log(returnRatesMean);

    var marketRates = await getCurrencyRates();
    var marketRatesMean = stats.mean(marketRates);

    var covar = stats.covariance(returnRates, returnRatesMean, marketRates, marketRatesMean);
    var marketVar = stats.variance(marketRates, marketRatesMean);

    return covar / marketVar;

}

module.exports = {

    getMarketRates,
    getCurrencyRates,
    getReturnRates,
    getFXReturnRates,
    risk,
    riskFX

}