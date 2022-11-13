const express = require('express');
const cors = require('cors');
const mongodb = require('./config/mongodb');

const app = express()
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/index.js'));
app.use('/assets', require('./routes/assets.js'));
app.use('/userProfile', require('./routes/userProfile.js'));
app.use('/teapot', require('./routes/teapot.js'));

app.listen(port, async () => {

    await mongodb.connect();
    console.log(`App listening on port ${port}`);

});
