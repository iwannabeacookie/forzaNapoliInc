export function checkAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (session) {
      if (session.passport) {
        return next();
      }
    }
  });

  res.status(500).send("Blyat, auth error");
}

export function checkunAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (!session) {
      return next();
    } else {
      if (!session.passport) {
        return next();
      }
    }
  });

  res.status(500).send("Blyat, auth error");
}