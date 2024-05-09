const express = require('express');
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oidc");
const usercollection = require('../models/user');
const googlecollection = require('../models/google_user');
const crypto = require("crypto");
require('dotenv').config();

//Strategies

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

//Serialize and Deserialize User

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

//CheckAuth

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/');
};

function checkUnAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/test');
    }

    next()
};

//Router

const router = express.Router();
router.use(flash());

//Log In get

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash("error") });
});

router.get('/login/google', passport.authenticate('google'));

router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: '/test',
    failureRedirect: '/login'
}));

//Log In post

router.post('/login', passport.authenticate('local', {
    successRedirect: '/test',
    failureRedirect: '/login',
    failureFlash: true
}));

//Sign Up get

router.get('/signup', (req, res) => {
    res.render('signup', { message: null });
});

//Sign Up post

router.post('/signup', async (req, res, next) => {

    //check if exist
    const checkuser = await usercollection.findOne({ email: req.body.email });
    const checkgoogle = await googlecollection.findOne({ email: req.body.email });
    if (checkuser || checkgoogle) {
        res.render('signup', { message: "Already used email" })
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

//Log Out get

router.get('/logout', checkAuth, (req, res) => {
    res.render('logout');
});

//Log Out post

router.post('/logout', checkAuth, (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

//Sign Out get

router.get('/signout', checkAuth, (req, res) => {
    res.render('signout');
})

//Sign Out post

router.post('/signout', checkAuth, async (req, res) => {
    if (req.session.passport.user.issuer) {
        const id = req.session.passport.user.id;
        req.logout((err) => { });
        await googlecollection.findOneAndDelete({ googleID: id });
        res.redirect('/');
    } else {
        const id = req.session.passport.user.id;
        req.logout((err) => { });
        await usercollection.findOneAndDelete({ _id: id });
        res.redirect('/');
    }
});

module.exports = router;