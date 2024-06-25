import sessionSchema from "../models/schemas/sessionSchema.js";
import mongoose from "mongoose";
const Session = mongoose.model("Session", sessionSchema);

export function checkAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid._value, (error, session) => {
    if (session) {
      if (session.passport) {
        return next();
      }
    }
  });

  res.status(500);
}

export function checkunAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid._value, (error, session) => {
    if (!session) {
      return next();
    } else {
      if (!session.passport) {
        return next();
      }
    }
  });

  res.status(500);
}

export const getUserIdFromSessionId = async (sessionId) => {
  try {
    const session = await Session.findOne({ _id: `sess:${sessionId}` });
    if (
      session &&
      session.session &&
      session.session.passport &&
      session.session.passport.user
    ) {
      return session.session.passport.user; // Assuming user ID is stored here
    }
    return null;
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
};
