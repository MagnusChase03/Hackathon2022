import numpy as np
import pandas
import pymongo
import os
import requests
import json
import time

COMPANIES = ['AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CSCO', 'CVX', 'GS', 'HD', 'HON', 'IBM', 'ITNC', 'JNJ', 'KO', 'JPM', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'PG', 'TRV', 'UNH', 'CRM', 'VZ', 'V', 'WBA', 'WMT', 'DIS', 'DOW']
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

def getMean(company):
    collection = DB[company]
    
    total = 0.0
    n = 0
    
    if n == 0:
        return total

    return total / n

def main():
    connectDB()
    getMarketData()
    # print(getMean("AAPL"))

main()