import express from "express";
import passport from "passport";
import flash from "connect-flash";
import usercollection from "../models/userModel.js";
import googlecollection from "../models/google_user.js";
import crypto from "crypto";
import localStrategy from "../strategies/localStrategy.js";
import { checkAuth } from '../../../helpers/auth.js'

//Strategy

passport.use(localStrategy);

//Router

const localAuth = express.Router();
localAuth.use(flash());

//Log In

localAuth.post("/login", passport.authenticate("local", { failureRedirect: '/message/error' }), (req, res) => {
    res.send(req.sessionID);
});

localAuth.get('/message/error', (req, res) => {
    res.status(400);
})

//Sign Up

localAuth.post("/signup", async (req, res, next) => {
    const checkuser = await usercollection.findOne({ email: req.body.email });
    const checkgoogle = await googlecollection.findOne({ email: req.body.email });
    if (checkuser || checkgoogle) {
        res.redirect('/message/error')
    } else {
        const salt = crypto.randomBytes(16).toString("base64");
        crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            "sha256",
            async (err, hashedPassword) => {
                if (err) return next(err);

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
                    Orders: [],
                };

                const userdata = await usercollection.insertMany(data);

                var user = {
                    issuer: userdata[0].issuer,
                    id: userdata[0]._id,
                    email: userdata[0].email,
                };

                req.login(user, (err) => {
                    if (err) return next(err);
                    res.send(req.sessionID);
                });
            },
        );
    }
});

//Log Out

localAuth.post("/logout", checkAuth, (req, res, next) => {
    req.sessionStore.destroy(req.body.sessionid, (error) => {
        res.status(200).end();
    })
});

//Sign Out

localAuth.post("/signout", checkAuth, async (req, res) => {
    req.sessionStore.get(req.body.sessionid, async (error, session) => {
        if (session) {
            await usercollection.findOneAndDelete({ _id: session.passport.user.id });
            req.sessionStore.destroy(req.body.sessionid, (error) => {
                console.log("destroied");
                res.status(200).end();
            })
        }
    });
});

//Sessio Get

localAuth.get('/api/session', checkAuth, (req, res) => {
    req.sessionStore.get(req.body.sessionid, async (error, session) => {
        if (session) {
            res.json(session);
        }
    });
}) 

export default localAuth