export function checkAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (session) {
      if (session.passport) {
        console.log(session.passport);
        return next();
      }
    } else {
      res.status(500);
    }
  });
}

export function checkunAuth(req, res, next) {
  req.sessionStore.get(req.body.sessionid, (error, session) => {
    if (!session) {
      return next();
    } else {
      if (!session.passport) {
        return next();
      } else {
        res.status(500);
      }
    }
  });
}
