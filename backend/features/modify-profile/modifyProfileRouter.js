import express from 'express';
import usercollection from "../user-auth/models/userModel.js";
import googlecollection from "../user-auth/models/google_user.js";
import { checkAuth } from "../../helpers/auth.js";

const modifyRouter = express.Router();

modifyRouter.post('/profile/modify/name', checkAuth, async (req, res) => {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                user.name = req.body.name;
                user.save();
                res.status(200).end();
            }
        }
    });
});

modifyRouter.post('/profile/modify/surname', checkAuth, async (req, res) => {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                user.surname = req.body.surname;
                user.save();
                res.status(200).end();
            }
        }
    });
});

modifyRouter.post('/profile/modify/password', checkAuth, async (req, res) => {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
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
                            res.status(200).end();
                        },
                    );
                }
            }
        }
    });
});

export default modifyRouter