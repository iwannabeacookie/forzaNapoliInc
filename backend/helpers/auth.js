export function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send("Blyat, auth error");
}

export function checkunAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.send("Blyat, auth error");
  }

  next();
}
