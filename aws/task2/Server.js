const express = require('express');
const app = express();
exports.dotenv = require("dotenv").config();
// const appRoutes = require('./Routes/employee')
const globalRoutes = require('./Routes/global')
const pool = require('./Utilities/dbConfig');
const cors = require('cors');
const port = process.env.APP_PORT
const host = process.env.HOST
app.use(express.json()); 
app.use(cors())

app.use('/',globalRoutes);



app.listen(port, host, () => {
    console.log(`App listening on ${host}:${port}!`);
});