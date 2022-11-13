const getReturnRates = require('getReturnRates');
const getMean = require('../helpers/getMean');
const getMarketRates = require('./getMarketRates');
const covariance = require('../helpers/covariance');
const variance = require('../helpers/variance');

const risk = (company) => {
    returnRates = getReturnRates(company);
    returnRatesMean = getMean(returnRates);

    marketRates = getMarketRates();
    marketRatesMean = getMean(marketRates);

    topCov = cov(returnRates, returnRatesMean, marketRates, marketRatesMean);
    marketVariance = getVar(marketRates, marketRatesMean);

    return topCov / marketVariance;
}

module.exports = { risk };