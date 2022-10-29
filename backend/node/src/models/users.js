const mongodb = require('../config/mongodb');

const getUsers = async () => {

    return await mongodb.getDB().collection('users').find({}).toArray();

}

module.exports = {

    getUsers

}
