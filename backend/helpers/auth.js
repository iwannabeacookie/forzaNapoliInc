export function checkAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (!session) {
      res.status(500).send("Blyat, auth error");
    } else {
      if (session.passport) {
        return next();
      }
    }
  });
}

export function checkunAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (session) {
      res.status(500).send("Blyat, auth error");
    } else {
      if (session.passport) {
        return next();
      }
    }
  });
}