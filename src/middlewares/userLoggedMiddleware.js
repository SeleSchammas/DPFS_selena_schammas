function userLoggedMiddleware(req, res, next) {
  res.locals.userLogged = null;

  if (req.session && req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddleware;
