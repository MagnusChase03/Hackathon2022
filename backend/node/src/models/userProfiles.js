const mongodb = require('../config/mongodb');

const getUsers = async () => {

    return await mongodb.getDB().collection('userProfiles').find({}).toArray();

}

const getUser = async (username) => {

    return await mongodb.getDB().collection('userProfiles').find({"username": username}).toArray();

}

const insertUser = async (userProfileData) => {

    await mongodb.getDB().collection('userProfiles').insertOne(userProfileData);

}

module.exports = {

    getUsers,
    getUser,
    insertUser

}
