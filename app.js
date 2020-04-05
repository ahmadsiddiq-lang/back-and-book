require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./src/router/product');
const bodyParser = require('body-parser');
const port = process.env.PORT || process.env.SERVER_PORT

app.use('/upload', express.static('./upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router)
app.listen(port, ()=>{
    console.log('listen port :'+port);
})