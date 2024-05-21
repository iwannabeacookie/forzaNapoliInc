import express from "express";
import passport from "passport";
import localAuth from "./routers/localRouter.js";
import GoogleAuth from "./routers/googleRouter.js";
import("dotenv/config");

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

//authRouter

const authRouter = express.Router();
authRouter.use(localAuth);
authRouter.use(GoogleAuth);

export default authRouter;
