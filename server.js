require("dotenv").config()
const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const app = express();

const initDB = require('./config/db');

const port = process.env.PORT || 3000;

morganBody(app)
app.use(cors())
app.use(express.static("./app/storage"))

app.use(
    bodyParser.json({
        limit: '20mb',
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use("/api",require("./app/routes"))

app.listen(port, ()=> {
    console.log('La aplicacion esta en linea')
});

initDB();