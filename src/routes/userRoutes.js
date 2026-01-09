const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const userController = require("../controllers/userController");

// Middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// =====================
// VALIDACIONES
// =====================

const registerValidations = [
  body("fullname").notEmpty().withMessage("El nombre es obligatorio"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Formato de email inválido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("Debe tener al menos 6 caracteres"),

  body("passwordConfirm")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Las contraseñas no coinciden"),
];

const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Formato de email inválido"),

  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

// =====================
// RUTAS
// =====================

// Formularios
router.get("/login", guestMiddleware, userController.loginForm);
router.get("/register", guestMiddleware, userController.registerForm);

// Procesar formularios
router.post("/login", guestMiddleware, loginValidations, userController.login);
router.post(
  "/register",
  guestMiddleware,
  registerValidations,
  userController.register
);

// Perfil
router.get("/profile", authMiddleware, userController.profile);

// Logout
router.post("/logout", authMiddleware, userController.logout);

module.exports = router;
