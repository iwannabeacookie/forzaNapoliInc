import express from "express";
import usercollection from "../user-auth/models/userModel.js";
import { checkAuth } from "../../helpers/auth.js";

const modifyRouter = express.Router();

/**
 * @openapi
 * /profile/name:
 *   put:
 *     tags:
 *       - User
 *     description: Change the user's name
 *     parameters:
 *       - name: sessionid
 *         in: body
 *         required: true
 *         description: The ID of the user's session
 *         schema:
 *           type: string
 *       - name: name
 *         in: body
 *         required: true
 *         description: The new value of user's name
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           string
 *       404:
 *         description: Not Found
 *
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
 *     description: Change the user's name
 *     parameters:
 *       - name: sessionid
 *         in: body
 *         required: true
 *         description: The ID of the user's session
 *         schema:
 *           type: string
 *       - name: surname
 *         in: body
 *         required: true
 *         description: The new value of user's surname
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           string
 *       404:
 *         description: Not Found
 *
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
 *     description: Change the user's name
 *     parameters:
 *       - name: sessionid
 *         in: body
 *         required: true
 *         description: The ID of the user's session
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         required: true
 *         description: The new value of user's password
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           string
 *       404:
 *         description: Not Found
 *
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
