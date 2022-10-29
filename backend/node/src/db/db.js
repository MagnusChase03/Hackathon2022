const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://root:' + process.env.MONGO_INITDB_ROOT_PASSWORD + '@mongodb:27017/?authSource=admin');

var db;

module.exports = {

    connect: async function() {

        var conn = await client.connect();
        db = conn.db('Hackathon2022');
        console.log(db);

    },

    getDB: function() {

        return db;

    }

};
