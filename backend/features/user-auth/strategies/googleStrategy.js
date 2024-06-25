import GoogleStrategy from "passport-google-oidc";
import usercollection from "../models/userModel.js";
import googlecollection from "../models/google_user.js";
import("dotenv/config");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/google/redirect",
    scope: ["profile", "email"],
  },
  async function verify(issuer, profile, cb) {
    const user = await usercollection.findOne({
      email: profile.emails[0].value,
    });
    if (user) {
      return cb(null, user);
    }

    const guser = await googlecollection.findOne({ googleID: profile.id });
    if (guser) {
      var gouser = {
        issuer: guser.issuer,
        id: guser._id,
        email: guser.email,
      };
      return cb(null, gouser);
    }

    const data = {
      issuer: issuer,
      name: profile.name.givenName,
      surname: profile.name.familyName,
      email: profile.emails[0].value,
      googleID: profile.id,
      role: "Customer",
      VIP: false,
      newsletter: false,
      Cart: [],
      Orders: [],
    };

    const userdata = await googlecollection.insertMany(data);

    var users = {
      issuer: userdata[0].issuer,
      id: userdata[0]._id,
      email: userdata[0].email,
    };

    return cb(null, users);
  },
);

export default googleStrategy;
