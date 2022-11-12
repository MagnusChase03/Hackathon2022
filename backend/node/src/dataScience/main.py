import numpy as np
import pandas
import pymongo
import os
import requests
import json

#API Key K2ZYSZNRVUVWQF2K
# https://www.alphavantage.czo/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=K2ZYSZNRVUVWQF2K

COMPANIES = ['AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM',
            'ITNC', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'CRM', 'VZ',
            'V', 'WBA', 'WMT', 'DIS', 'DOW']

def connectDB():
    CONNECTION_STRING = 'mongodb://root:' + os.environ['MONGO_INITDB_ROOT_PASSWORD'] + '@mongodb:27017/?authSource=admin'
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client[os.environ['MONGO_INITDB_DATABASE']]
    return db

def getCompanyData(company):
    database = connectDB()

    try:

        companyCollection = database[company]
        if (companyCollection.find_one() == None):
            companyData = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + company + '&apikey=K2ZYSZNRVUVWQF2K')
            data = json.loads(companyData.text)
            print(data)
            companyCollection.insert_one(data["Time Series (Daily)"])
    except:
        print("Didnt get company %s" % company)


def getData():

    for company in COMPANIES:
        getCompanyData(company)

def readData(company):
    database = connectDB()

    try:
        companyCollection = database[company].find_one()
        initial = companyCollection["2022-11-10"]
        initial = initial["4. close"]
        final = companyCollection["2022-11-11"]
        final = final["4. close"]

        ret = (float(final) - float(initial)) / float(initial)
        companyStats = database["stockReturnValues"]
        print(companyStats)
        for i in companyStats.find():
            print(i)

        data = {company: ret}
        print(data)
        companyStats.insert_one(data)
    except:
        print("%s did not work" % company)


def calculateReturn():

    for company in COMPANIES:
        readData(company)

def main():
    #getData()
    #calculateReturn()
    pass

main()