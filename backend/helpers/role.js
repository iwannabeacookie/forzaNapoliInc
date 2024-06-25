import usercollection from "../models/userModel.js";

export function isCustomer(req, res, next) {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                if (user.role === "Customer") {
                    return next();
                }
            }
        }
    });

    res.status(500);
}

export function isAdmin(req, res, next) {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                if (user.role === "Admin") {
                    return next();
                }
            }
        }
    });

    res.status(500);
}

export function isModerator(req, res, next) {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                if (user.role === "Moderator") {
                    return next();
                }
            }
        }
    });

    res.status(500);
}

export function isSupport(req, res, next) {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findOne({
                    _id: session.passport.user.id,
                });
                if (user.role === "Support") {
                    return next();
                }
            }
        }
    });

    res.status(500);
}