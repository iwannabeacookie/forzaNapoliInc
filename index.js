const express = require('express');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const logger = require("morgan");
const MongoDbStore = require("connect-mongodb-session")(session);
const usercollection = require('./mangodb');
const crypto = require("crypto");
const { name } = require('ejs');
require('dotenv').config()
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  databaseName: 'foza_napoli',
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

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const auth = await usercollection.findOne({ email: username });
  if (auth) {
    crypto.pbkdf2(password, auth.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) { console.log(err); return cb(err); }
      if (auth.password != hashedPassword.toString("base64")) {
        return cb(null, false, { message: "Incorrect password." });
      }
      return cb(null, auth);
    });
  }
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

app.use(passport.authenticate('session'));
app.use(passport.session());

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/');
}

function checkUnAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/test');
  }

  next()
}

app.get('/', checkUnAuth, (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));

app.get("/test", checkAuth, async (req, res) => {
  const id = req.session.passport.user.id;
  const userdata = await usercollection.findOne({ _id: id });
  res.render('test', { data: userdata });
});

app.post('/signup', async (req, res, next) => {

  //check if exist
  const check = await usercollection.findOne({ name: req.body.username });
  if (check) {
    //todo
    res.send("found");
  } else {

    const salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) { return next(err); }

      const data = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword.toString("base64"),
        salt: salt,
        VIP: false,
        newsletter: false,
        Cart: [],
        Orders: []
      }

      const userdata = await usercollection.insertMany(data);

      var user = {
        id: userdata[0]._id,
        email: userdata[0].email
      };

      req.login(user, (err) => {
        if (err) { return next(err); }
        res.redirect('/test');
      })
    })
  }
});

app.get('/logout', checkAuth, (req, res) => {
  res.render('logout');
})

app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/signout', checkAuth, (req, res) => {
  res.render('signout');
})

app.post('/signout', checkAuth,async (req, res, next) => {
  const id = req.session.passport.user.id;
  req.logout((err) => {});
  await usercollection.findOneAndDelete({ _id: id });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});