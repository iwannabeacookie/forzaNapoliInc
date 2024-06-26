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
    failureRedirect: "https://cd-ui1-6bafkhtnna-ew.a.run.app/auth/login",
  }),
);

GoogleAuth.get("/google/success", (req, res) => {
  const redirect =
    "https://cd-ui1-6bafkhtnna-ew.a.run.app/auth/google/" + req.sessionID;
  res.redirect(redirect);
});

export default GoogleAuth;
