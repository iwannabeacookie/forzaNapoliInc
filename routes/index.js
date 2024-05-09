const express = require('express');
const usercollection = require('../models/user');
const googlecollection = require('../models/google_user');

//Router

const router = express.Router();

//Pages

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

router.get('/', checkUnAuth, (req, res) => {
    res.render('home');
});

router.get("/test", checkAuth, async (req, res) => {
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

module.exports = router;