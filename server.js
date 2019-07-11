const express = require('express');
const bodyParser = require("body-parser");


const app = express();

//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({extended: false}));

//call mongodb method 

const mongoDB = require('./config/db');
mongoDB();

//routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const port = 5000 || process.env.PORT;

app.listen(port, ()=>console.log(`server is running on port ${port}`))
