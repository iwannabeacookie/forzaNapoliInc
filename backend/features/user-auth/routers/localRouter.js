import express from "express";
import passport from "passport";
import flash from "connect-flash";
import usercollection from "../models/userModel.js";
import googlecollection from "../models/google_user.js";
import crypto from "crypto";
import localStrategy from "../strategies/localStrategy.js";
import { checkAuth } from "../../../helpers/auth.js";

//Strategy

passport.use(localStrategy);

//Router

const localAuth = express.Router();
localAuth.use(flash());

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 */

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User info related endpoints
 */

//Log In

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Return User Session Id
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       400:
 *         description: Wrong credential
 */

localAuth.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/message/error" }),
  (req, res) => {
    res.send(req.sessionID);
  },
);

localAuth.get("/message/error", (req, res) => {
  res.status(400);
});

//Sign Up

/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               surname:
 *                 type: string
 *                 description: User's surname
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Return User Session Id
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       400:
 *         description: Already used credential
 */

localAuth.post("/signup", async (req, res, next) => {
  const checkuser = await usercollection.findOne({ email: req.body.email });
  const checkgoogle = await googlecollection.findOne({ email: req.body.email });
  if (checkuser || checkgoogle) {
    res.redirect("/message/error");
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
          role: "Customer",
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

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     description: Log Out
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionid:
 *                 type: string
 *                 description: User's session Id
 *     responses:
 *       200:
 *         description: Session successfully destroyed
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Non logged in user
 */

localAuth.post("/logout", checkAuth, (req, res) => {
  req.sessionStore.destroy(req.body.sessionid, (error) => {
    res.status(200).send("OK");
  });
});

//Sign Out

/**
 * @openapi
 * /signout:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign Out
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionid:
 *                 type: string
 *                 description: User's session Id
 *     responses:
 *       200:
 *         description: Account successfully destroyed
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Non logged in user
 */

localAuth.post("/signout", checkAuth, async (req, res) => {
  req.sessionStore.get(req.body.sessionid, async (error, session) => {
    if (session) {
      if (session.passport.user.issuer) {
        await googlecollection.findOneAndDelete({
          _id: session.passport.user.id,
        });
      } else {
        await usercollection.findOneAndDelete({
          _id: session.passport.user.id,
        });
      }
      req.sessionStore.destroy(req.body.sessionid._value, (error) => {
        console.log("destroied");
        res.status(200).end();
      });
    }
  });
});

//Get Session

/**
 * @openapi
 * /session/{sessionId}:
 *   get:
 *     tags:
 *       - User
 *     description: Fetches a session by ID
 *     parameters:
 *       - name: sessionId
 *         in: path
 *         required: true
 *         description: The ID of the session to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Invalid session ID
 */

localAuth.get("/session/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.get(sessionId, async (error, session) => {
    if (session) {
      res.json(session);
    } else {
      res.status(500).send("Nn valid session ID");
    }
  });
});

//Get User

/**
 * @openapi
 * /user/{sessionId}:
 *   get:
 *     tags:
 *       - User
 *     description: Fetches a User by sessionID
 *     parameters:
 *       - name: sessionId
 *         in: path
 *         required: true
 *         description: The ID of the session of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: No valid session ID
 */

localAuth.get("/user/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.get(sessionId, async (error, session) => {
    if (session) {
      if (session.passport) {
        const user = await usercollection.findOne({
          _id: session.passport.user.id,
        });
        res.json(user);
      }
    } else {
      res.status(500).send("Non valid Session");
    }
  });
});

export default localAuth;
