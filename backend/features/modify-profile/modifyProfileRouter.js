import express from "express";
import usercollection from "../user-auth/models/userModel.js";
import { checkAuth } from "../../helpers/auth.js";
import * as crypto from "crypto";

const modifyRouter = express.Router();

/**
 * @openapi
 * /profile/name:
 *   put:
 *     tags:
 *       - User
 *     description: Change the user's name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionid:
 *                 type: string
 *                 description: The ID of the user's session
 *               name:
 *                 type: string
 *                 description: The new value of the user's name
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

modifyRouter.put("/profile/name", checkAuth, async (req, res) => {
  req.sessionStore.get(req.body.sessionid, async (error, session) => {
    if (session) {
      if (session.passport) {
        const user = await usercollection.findOne({
          _id: session.passport.user.id,
        });
        user.name = req.body.name;
        user.save();
        res.status(200).send("OK");
      }
    }
  });
});

/**
 * @openapi
 * /profile/surname:
 *   put:
 *     tags:
 *       - User
 *     description: Change the user's surname
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionid:
 *                 type: string
 *                 description: The ID of the user's session
 *               surname:
 *                 type: string
 *                 description: The new value of the user's surname
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

modifyRouter.put("/profile/surname", checkAuth, async (req, res) => {
  req.sessionStore.get(req.body.sessionid, async (error, session) => {
    if (session) {
      if (session.passport) {
        const user = await usercollection.findOne({
          _id: session.passport.user.id,
        });
        user.surname = req.body.surname;
        user.save();
        res.status(200).send("OK");
      }
    }
  });
});

/**
 * @openapi
 * /profile/password:
 *   put:
 *     tags:
 *       - User
 *     description: Change the user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionid:
 *                 type: string
 *                 description: The ID of the user's session
 *               password:
 *                 type: string
 *                 description: The new value of the user's password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

modifyRouter.put("/profile/password", checkAuth, async (req, res) => {
  req.sessionStore.get(req.body.sessionid, async (error, session) => {
    if (session) {
      if (session.passport) {
        if (!session.passport.user.issuer) {
          const user = await usercollection.findOne({
            _id: session.passport.user.id,
          });
          const salt = crypto.randomBytes(16).toString("base64");
          crypto.pbkdf2(
            req.body.password,
            salt,
            310000,
            32,
            "sha256",
            async (err, hashedPassword) => {
              if (err) return next(err);

              user.password = hashedPassword.toString("base64");
              user.salt = salt;

              user.save();
              res.status(200).send("OK");
            },
          );
        }
      }
    }
  });
});

export default modifyRouter;
