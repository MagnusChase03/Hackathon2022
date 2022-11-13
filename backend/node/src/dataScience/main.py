import numpy as np
import pandas
import pymongo
import os
import requests
import json
import time

#API Key K2ZYSZNRVUVWQF2K
# https://www.alphavantage.czo/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=K2ZYSZNRVUVWQF2K

COMPANIES = ['AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'ITNC', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'CRM', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']

def connectDB():
    CONNECTION_STRING = 'mongodb://root:' + os.environ['MONGO_INITDB_ROOT_PASSWORD'] + '@mongodb:27017/?authSource=admin'
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client[os.environ['MONGO_INITDB_DATABASE']]
    return db

def getMarketData():
    database = connectDB()
    
    for company in COMPANIES:
        try:
            companyCollection = database[company]
            if (companyCollection.find_one() == None):

                companyData = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + company + '&apikey=K2ZYSZNRVUVWQF2K')
                data = json.loads(companyData.text)
                companyCollection.insert_one(data["Time Series (Daily)"])
                time.sleep(13)
        except:
            print("%s broke" % company)


def getReturnRates():
    database = connectDB()
    
    for company in COMPANIES:
        try:
            
            companyCollection = database[company]
            if (companyCollection.find_one() != None):

                closeValues = []

                companyData = companyCollection.find_one()
                for date, data in companyData.items():
                    try:
                        closeValues.append(float(data['4. close']))
                    except:
                        print("Error finding close")

                returnValues = []
                for i in range(0, len(closeValues) - 1):
                    returnValues.append((closeValues[i] - closeValues[i + 1]) / closeValues[i + 1])

                index = 0
                for date, data in companyData.items():
                    try:
                        collectionName = "%sReturnValues" % company

                        companyReturnValueCollections = database[collectionName]

                        returnValueObj = {date: returnValues[index]}

                        companyReturnValueCollections.insert_one({date: returnValueObj})

                        index += 1
                        if index >= len(returnValues):
                            break

                    except:
                        print("Error finding close")

                

        except:
            print("%s broke" % company)

def getMean():
    database = connectDB()
    
    for company in COMPANIES:
        collectionName = "%sReturnValues" % company
        companyCollection = database[collectionName]

        total = 0.0
        num = 0
        for day in companyCollection.find():
            for date, returnValue in day.items():
                if (date != "_id"):
                    try:
                        total += returnValue
                        num += 1
                    except:
                        print("Error with returnValue")

        print(total)
        print(num)
        try:
            total = total / num
        except:
            print("Division by zero")

        companyCollection.insert_one({"mean": total})
# def getCompanyData(company):
#     database = connectDB()

#     try:

#         companyCollection = database[company]
#         if (companyCollection.find_one() == None):
#             companyData = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + company + '&apikey=K2ZYSZNRVUVWQF2K')
#             data = json.loads(companyData.text)
#             companyCollection.insert_one(data["Time Series (Daily)"])
#     except:
#         print("Didnt get company %s" % company)


# def getData():

#     for company in COMPANIES:
#         getCompanyData(company)

# def readData(company):
#     database = connectDB()

#     try:
#         companyCollection = database[company].find_one()
#         initial = companyCollection["2022-11-10"]
#         initial = initial["4. close"]
#         final = companyCollection["2022-11-11"]
#         final = final["4. close"]

#         ret = (float(final) - float(initial)) / float(initial)

#         collection = "%sReturnValue" % company
#         companyStats = database[collection]

#         data = {"value": ret}
#         companyStats.insert_one(data)
#     except:
#         print("%s did not work" % company)


# def getMean():
#     database = connectDB()

#     total = 0.0
#     for company in COMPANIES:
#         try:
#             collection = "%sReturnValue" % company
#             companyStats = database[collection]
#             stat = companyStats.find_one()
#             total += stat["value"]
#         except:
#             print("%s broke" % company)

#     return total / 30

# def getVar(mean):
#     database = connectDB()

#     total = 0.0
#     for company in COMPANIES:
#         try:
#             collection = "%sReturnValue" % company
#             companyStats = database[collection]
#             stat = companyStats.find_one()
#             total += (stat["value"] - mean) ** 2
#         except:
#             print("%s broke" % company)

#     return total / (30 ** 2)

# def calculateReturn():

#     for company in COMPANIES:
#         readData(company)


def main():
    # getMarketData()
    # getReturnRates()
    getMean()
    # v = getVar(m)
    # print(v)

main()