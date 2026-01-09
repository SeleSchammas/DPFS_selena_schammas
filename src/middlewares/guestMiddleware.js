function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/users/profile"); // si ya está logueado, no puede entrar al login
  }
  next();
}

module.exports = guestMiddleware;
