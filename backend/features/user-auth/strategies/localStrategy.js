import LocalStrategy from "passport-local";
import crypto from "crypto";
import usercollection from "../models/userModel.js";

const localStrategy = new LocalStrategy(async function verify(
  username,
  password,
  cb,
) {
  const auth = await usercollection.findOne({ email: username });
  if (auth && !auth.issuer) {
    crypto.pbkdf2(
      password,
      auth.salt,
      310000,
      32,
      "sha256",
      (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return cb(err);
        }
        if (auth.password != hashedPassword.toString("base64")) {
          return cb(null, false, { message: "Incorrect password" });
        }
        var auuser = {
          issuer: null,
          id: auth._id,
          email: auth.email,
        };
        return cb(null, auuser);
      },
    );
  } else {
    return cb(null, false, { message: "Incorrect User" });
  }
});

export default localStrategy;
