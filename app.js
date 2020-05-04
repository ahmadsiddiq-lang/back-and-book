require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./src/router/product');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieSession = require('cookie-session');

const port = process.env.PORT || process.env.SERVER_PORT

app.use(cors({ credentials: true, origin: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['Selamat Datang', 'Kemabli disini'],
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
  httpOnly: true
}))

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use(function (req, res, next) {
  // Update views
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  // Write response
  next();
})

app.use('/upload', express.static('./upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.options('/',cors)

const issue = {
    origin: true,
    methods: ["PUT,PATCH,POST,DELETE"],
    credentials: true,
    maxAge: 3600
  };
app.use('/', cors(issue), router)
app.listen(port, ()=>{
    console.log('listen port :'+port);
})