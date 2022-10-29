const express = require('express');
const cors = require('cors');
const mongodb = require('./config/mongodb');

const app = express()
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/index.js'));

app.listen(port, async () => {

    await mongodb.connect();
    console.log(`App listening on port ${port}`);

});
