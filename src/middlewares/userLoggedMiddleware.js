const User = require("../models/User");

function userLoggedMiddleware(req, res, next) {
  res.locals.userLogged = null;

  if (req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged;
    return next();
  }

  if (req.cookies.userEmail) {
    const user = User.findByEmail(req.cookies.userEmail);
    if (user) {
      req.session.userLogged = user;
      res.locals.userLogged = user;
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
