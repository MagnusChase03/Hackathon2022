const covariance = (returnValues, returnValueMean, marketReturnValues, marketReturnValuesMean) => {
    var total = 0.0;
    var num = 0;

    for (let i = 0; i < returnValues.length; i++){
        total += ((returnValues[i] - returnValueMean) * (marketReturnValues[i] - marketReturnValuesMean));
        num += 1;

    }
    
    return total / (num - 1);
}

module.exports = {

    covariance

}