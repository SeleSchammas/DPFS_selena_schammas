function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect("/users/login"); // si no está logueado, va al login
  }
  next();
}

module.exports = authMiddleware;
