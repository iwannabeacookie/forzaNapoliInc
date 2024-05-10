import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import historyRouter from "./history-router.js";
import session from "express-session";
import passport from "passport";
import MongoDbStore from "connect-mongodb-session"(session);
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';

const app = express();
const port = 3000;
export const mClient = import("./mongodb/mongodb.js");

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

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

app.set('view engine', 'ejs');


//Setting up the session

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  databaseName: 'forza_napoli',
  collection: 'FNSession'
});


app.use(passport.authenticate('session'));
app.use(passport.session());

//Setting up the router

app.use('/', indexRouter);
app.use('/', authRouter);
app.use(historyRouter);

//Setting up the listener

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
