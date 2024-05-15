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
        successRedirect: "/test",
        failureRedirect: "/login",
    }),
);

export default GoogleAuth;