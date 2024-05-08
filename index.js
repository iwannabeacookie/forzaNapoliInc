const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oidc");
const logger = require("morgan");
const MongoDbStore = require("connect-mongodb-session")(session);
const usercollection = require('./models/user');
const googlecollection = require('./models/google_user');
const crypto = require("crypto");
const { name } = require('ejs');
const { CLIENT_RENEG_WINDOW } = require('tls');
require('dotenv').config()
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb connected");
}).catch((err) => {
  console.log(err);
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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
        return cb(null, false, { message: "Incorrect password" });
      }
      var auuser = {
        issuer: null,
        id: auth._id,
        email: auth.email
      };
      return cb(null, auuser);
    });
  } else {
    return cb(null, false, { message: "Incorrect User" });
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/google/redirect',
  scope: ["profile", "email"]
}, async function verify(issuer, profile, cb) {
  const user = await usercollection.findOne({ email: profile.emails[0].value });
  if (user) {
    return cb(null, user);
  }

  const guser = await googlecollection.findOne({ googleID: profile.id });
  if (guser) {
    var gouser = {
      issuer: guser.issuer,
      id: guser.googleID,
      email: guser.email
    };
    return cb(null, gouser);
  }

  const data = {
    issuer: issuer,
    name: profile.name.givenName,
    surname: profile.name.familyName,
    email: profile.emails[0].value,
    googleID: profile.id,
    VIP: false,
    newsletter: false,
    Cart: [],
    Orders: []
  }

  const userdata = await googlecollection.insertMany(data);

  var users = {
    issuer: userdata[0].issuer,
    id: userdata[0].googleID,
    email: userdata[0].email
  };

  return cb(null, users);
}));

app.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/test',
  failureRedirect: '/login'
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { issuer: user.issuer, id: user.id, email: user.email });
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

app.use(flash());

app.get('/', checkUnAuth, (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login', {message: req.flash("error")});
});

app.get('/signup', (req, res) => {
  res.render('signup', {message: null});
});

app.get('/login/google', passport.authenticate('google'));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/test',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get("/test", checkAuth, async (req, res) => {
  if (req.session.passport.user.issuer) {
    const id = req.session.passport.user.id;
    const userdata = await googlecollection.findOne({ googleID: id });
    res.render('test', { data: userdata });
  } else {
    const id = req.session.passport.user.id;
    const userdata = await usercollection.findOne({ _id: id });
    res.render('test', { data: userdata });
  }
});

app.post('/signup', async (req, res, next) => {

  //check if exist
  const checkuser = await usercollection.findOne({ email: req.body.email });
  const checkgoogle= await googlecollection.findOne({ email: req.body.email });
  if (checkuser || checkgoogle) {
    res.render('signup', { message: "Already used email"})
  } else {

    const salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) { return next(err); }

      const data = {
        issuer: null,
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
        issuer: userdata[0].issuer,
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

app.post('/logout', checkAuth,(req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/signout', checkAuth, (req, res) => {
  res.render('signout');
})

app.post('/signout', checkAuth, async (req, res, next) => {
  const id = req.session.passport.user.id;
  req.logout((err) => { });
  await usercollection.findOneAndDelete({ _id: id });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});