const mongodb = require('../../config/mongodb');

const COMPANIES = ['GME', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']
const CURRENCIES = ['EUR', 'GBP', 'CAD']

// def getMarketRates():

//     returnRates = []
//     for company in COMPANIES:
//         returnRates.append(getReturnRates(company))

//     meanReturnRates = []
//     for i in range(0, len(returnRates[0])):

//         total = 0.0
//         num = 0
//         for j in range(0, len(returnRates)):
//             total += returnRates[j][i]
//             num += 1

//         total = total / num
//         meanReturnRates.append(total)

//     return meanReturnRates

const getMarketRates = async () => {

    var returnRates = []
    for (var i = 0; i < COMPANIES.length; i++) {

        returnRates.push(await getReturnRates(COMPANIES[i]));

    }

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

module.exports = {

    getReturnRates,
    getFXReturnRates

}