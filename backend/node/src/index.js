const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const app = express()
const port = 3000

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.listen(port, async () => {

    await db.connect();
    console.log(`App listening on port ${port}`);

});
