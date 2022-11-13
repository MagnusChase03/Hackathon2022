const getStd = (returnRates, mean) => {
    var total = 0.0;
    var n = 0;

    for (let returnRate in returnRates){
        total += (returnRate - mean) ** 2;
        n += 1;
    }

    return (total / (n-1)) ** (1/2);
}

module.exports = { getStd };