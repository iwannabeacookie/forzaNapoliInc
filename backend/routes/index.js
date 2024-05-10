import express from "express";
import usercollection from "../models/user.js";
import googlecollection from "../models/google_user.js";

//Router

export const indexRouter = express.Router();

//Check Auth

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

function checkUnAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/test");
  }

  next();
}

//Pages

indexRouter.get("/", checkUnAuth, (req, res) => {
  res.render("home");
});

indexRouter.get("/test", checkAuth, async (req, res) => {
  if (req.session.passport.user.issuer) {
    const id = req.session.passport.user.id;
    const userdata = await googlecollection.findOne({ googleID: id });
    res.render("test", { data: userdata });
  } else {
    const id = req.session.passport.user.id;
    const userdata = await usercollection.findOne({ _id: id });
    res.render("test", { data: userdata });
  }
});
