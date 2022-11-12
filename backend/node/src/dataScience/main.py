import numpy as np
import pymongo as MongoClient
import os

#API Key K2ZYSZNRVUVWQF2K
# https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=K2ZYSZNRVUVWQF2K

def connectDB():
    CONNECTION_STRING = 'mongodb://root:' + os.MONGO_INITDB_ROOT_PASSWORD + '@mongodb:27017/?authSource=admin'
    client = MongoClient(CONNECTION_STRING)
    return client

def getData():
    database = connectDB()

    

def main():
    getData()

main()