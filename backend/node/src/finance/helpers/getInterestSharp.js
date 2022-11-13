const getInterestReturnRates = require('../stocks/getInterestReturnRates');

const getInterestStd = (mean) => {
    interestreturnRates = getInterestReturnRates();

    var total = 0.0;
    var n = 0;

    for (let month in interestreturnRates){
        total += (month - mean) ** 2;
        n += 1;
    }

    return (total / (n-1)) ** (1/2);
}

module.exports = { getInterestStd };