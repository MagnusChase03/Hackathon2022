const getInterstReturnRates = require('./getInterestReturnRates'); 

const getInterestMean = () => {
    let interstReturnRates = getInterstReturnRates();

    var total = 0.0;
    var n = 0;

    for (let month in interestReturnRates){
        total += month;
        n += 1;
    }

    return (total / n);
}

module.exports = { getInterestMean };