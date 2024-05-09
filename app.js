const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoDbStore = require("connect-mongodb-session")(session);
require('dotenv').config();
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

//Setting up the app

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb connected");
}).catch((err) => {
  console.log(err);
});

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Setting up the session

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  databaseName: 'forza_napoli',
  collection: 'FNSession'
});

app.use(
  session({
    secret: 'secret string',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(passport.authenticate('session'));
app.use(passport.session());

//Setting up the router

app.use('/', indexRouter);
app.use('/', authRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});