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