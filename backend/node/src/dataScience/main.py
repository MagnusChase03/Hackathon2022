import numpy as np
import pandas
import pymongo
import os
import requests
import json
import time

COMPANIES = ['AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']
DB = None
API_KEY = os.environ["API_KEY"]

def makeRequest(company):
    res = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=%s&apikey=%s' % (company, API_KEY))
    return res


def connectDB():
    CONNECTION_STRING = 'mongodb://root:' + os.environ['MONGO_INITDB_ROOT_PASSWORD'] + '@mongodb:27017/?authSource=admin'
    client = pymongo.MongoClient(CONNECTION_STRING)

    global DB
    DB = client[os.environ['MONGO_INITDB_DATABASE']]

def getMarketData():
    for company in COMPANIES:
        collection = DB[company]

        if (collection.count_documents({}) == 0):

            print("Grabbing %s data..." % (company))
            
            res = makeRequest(company)
            data = json.loads(res.text)

            for date, data in data["Time Series (Daily)"].items():
                
                cleanedObj = {"date": date}
                for key, value in data.items():
                    cleanedObj[key] = value

                collection.insert_one(cleanedObj)

                time.sleep(50/1000)

def getBondData():
    f = open("bonds.json", "r")
    data = f.read()
    f.close()

    collection = DB["Bonds"]

    data = json.loads(data)
    data = data["data"]
    for month in data:
        if not (collection.count_documents({"record_date": month["record_date"]}) == 0 and collection.count_documents({"src_line_nbr": month["src_line_nbr"]}) == 0):
            collection.insert_one(month)


def getReturnRates(company):
    collection = DB[company]

    days = []
    for day in collection.find():
        days.append(day)
    
    returnRates = []
    for i in range(0, len(days) - 1):
        initial = float(days[i + 1]["4. close"])
        final = float(days[i]["4. close"])

        returnRates.append((final - initial) / initial)

    return returnRates

def getMarketRates():

    returnRates = []
    for company in COMPANIES:
        returnRates.append(getReturnRates(company))

    meanReturnRates = []
    for i in range(0, len(returnRates[0])):

        total = 0.0
        num = 0
        for j in range(0, len(returnRates)):
            total += returnRates[j][i]
            num += 1

        total = total / num
        meanReturnRates.append(total)

    return meanReturnRates


def getIntrestReturnRates():
    collection = DB["Bonds"]

    months = []
    for month in collection.find():
        months.append(month)
    
    returnRates = []
    for i in range(0, len(months) - 1):
        initial = float(months[i + 1]["avg_interest_rate_amt"])
        final = float(months[i]["avg_interest_rate_amt"])

        returnRates.append((final - initial) / initial)

    return returnRates

def getMean(returnRates):
    
    total = 0.0
    n = 0

    for returnRate in returnRates:
        total += returnRate
        n += 1

    return total / n

def getIntrestMean():

    intrestReturnRates = getIntrestReturnRates()

    total = 0.0
    n = 0

    for month in intrestReturnRates:
        total += month
        n += 1

    return total / n

def getStd(returnRates, mean):
    
    total = 0.0
    n = 0

    for returnRate in returnRates:
        total += (returnRate - mean) ** 2
        n += 1

    return (total / (n - 1)) ** (1/2)

def getVar(returnRates, mean):
    
    total = 0.0
    n = 0

    for returnRate in returnRates:
        total += (returnRate - mean) ** 2
        n += 1

    return total / (n - 1)

def getIntrestStd(mean):
    
    intrestReturnRates = getIntrestReturnRates()

    total = 0.0
    n = 0

    for month in intrestReturnRates:
        total += (month - mean) ** 2
        n += 1

    return (total / (n - 1)) ** (1/2)

def cov(returnValues, returnValueMean, marketReturnValues, marketReturnValuesMean):

    total = 0.0
    num = 0
    for i in range(0, len(returnValues)):

        total += ((returnValues[i] - returnValueMean) * (marketReturnValues[i] * marketReturnValuesMean))
        num += 1

    return total / (num - 1)


def risk(company):
    returnRates = getReturnRates(company)
    returnRatesMean = getMean(returnRates)

    marketRates = getMarketRates()
    marketRatesMean = getMean(marketRates)

    topCov = cov(returnRates, returnRatesMean, marketRates, marketRatesMean)
    marketVariance = getVar(marketRates, marketRatesMean)

    return topCov / marketVariance

def getSharp(company):
    returnRates = getReturnRates(company)

    m = getMean(returnRates)
    s = getStd(returnRates, m)

    return m / s

def getIntrestSharp():

    m = getIntrestMean()
    s = getIntrestStd(m)

    return m / s

def main():
    connectDB()
    getMarketData()
    getBondData()
    print(getIntrestSharp())
    print(getSharp("AAPL"))
    print(getSharp("CSCO"))
    print(risk("AAPL"))
    print(risk("CSCO"))
    print(risk("NKE"))

main()