import express from "express";
import passport from "passport";
import googleStrategy from "../strategies/googleStrategy.js";

//Strategy

passport.use(googleStrategy);

//Router

const GoogleAuth = express.Router();

//Log In

GoogleAuth.get("/login/google", passport.authenticate("google"));

GoogleAuth.get(
    "/google/redirect",
    passport.authenticate("google", {
        successRedirect: "/google/success",
        failureRedirect: "http://localhost:5000/auth/login",
    }),
);

GoogleAuth.get('/google/success', (req, res) => {
    const redirect = "http://localhost:5000/auth/google/" + req.sessionID;
    res.redirect(redirect);
})

export default GoogleAuth;