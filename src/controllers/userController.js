const { validationResult } = require("express-validator");
const User = require("../models/User");

const userController = {
  // =====================
  // FORMULARIOS
  // =====================

  loginForm: (req, res) => {
    return res.render("users/login", {
      title: "Iniciar sesión",
      userLogged: req.session.userLogged || null,
      errors: {},
      oldData: {},
    });
  },

  registerForm: (req, res) => {
    return res.render("users/register", {
      title: "Registrarse",
      userLogged: req.session.userLogged || null,
      errors: {},
      oldData: {},
    });
  },

  // =====================
  // PROCESAR REGISTRO
  // =====================
  register: (req, res) => {
    console.log("ENTRO AL REGISTRO");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/register", {
        title: "Registrarse",
        errors: errors.mapped(),
        oldData: req.body,
      });
    }

    try {
      const { fullname, email, password } = req.body;

      const existingUser = User.findByEmail(email);
      if (existingUser) {
        return res.render("users/register", {
          title: "Registrarse",
          errors: { email: { msg: "El correo ya esta registrado" } },
          oldData: req.body,
        });
      }

      const image = req.file
        ? `users/${req.file.filename}`
        : "users/default.jpg";

      const newUser = User.create({
        name: fullname,
        email,
        password,
        image,
      });

      console.log("USUARIO CREADO: ", newUser);

      req.session.userLogged = newUser;

      return res.redirect("/users/profile");
    } catch (error) {
      console.error("ERROR EN REGISTER: ", error);
      return res.status(500).send("Error al registrar usuario");
    }
  },

  // =====================
  // PROCESAR LOGIN
  // =====================

  login: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/login", {
        title: "Iniciar sesión",
        userLogged: req.session.userLogged || null,
        errors: errors.mapped(),
        oldData: req.body,
      });
    }

    const { email, password } = req.body;
    const user = User.validateLogin(email, password);

    if (!user) {
      return res.render("users/login", {
        title: "Iniciar sesión",
        userLogged: req.session.userLogged || null,
        errors: { credentials: { msg: "Credenciales inválidas" } },
        oldData: req.body,
      });
    }

    req.session.userLogged = user;

    if (req.body.recordarme) {
      res.cookie("userEmail", user.email, {
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    return res.redirect("/users/profile");
  },

  // =====================
  // PERFIL
  // =====================

  profile: (req, res) => {
    if (!req.session.userLogged) {
      return res.redirect("/users/login");
    }

    return res.render("users/profile", {
      title: "Mi Perfil",
      user: req.session.userLogged,
    });
  },

  // =====================
  // LOGOUT
  // =====================

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy(() => {
      res.redirect("/users/login");
    });
  },
};

module.exports = userController;
