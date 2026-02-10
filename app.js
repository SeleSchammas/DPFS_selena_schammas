const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// ------------------ Sequelize ------------------
const db = require("./src/database/models");

db.sequelize
  .authenticate()
  .catch((err) => console.error("❌ Error de conexión:", err));

// ------------------ App ------------------
const app = express();

// ------------------ Settings / view engine ------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// ------------------ Middlewares base ------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

// ------------------ Session ------------------
app.use(
  session({
    secret: "bronteSecretKey",
    resave: false,
    saveUninitialized: false,
  }),
);

// 👉 Middleware global de usuario logueado
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");
app.use(userLoggedMiddleware);

// ------------------ Rutas principales ------------------

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Home - Bronte Bags" });
});

// ------------------ Secciones públicas ------------------
app.get("/productos", (req, res) =>
  res.render("products/todos", { title: "Productos - Bronte Bags" }),
);
app.get("/carteras", (req, res) =>
  res.render("products/carteras", { title: "Carteras - Bronte Bags" }),
);
app.get("/mochilas", (req, res) =>
  res.render("products/mochilas", { title: "Mochilas - Bronte Bags" }),
);
app.get("/gafas", (req, res) =>
  res.render("products/gafas", { title: "Gafas Unisex - Bronte Bags" }),
);
app.get("/accesorios", (req, res) =>
  res.render("products/accesorios", {
    title: "Accesorios Unisex - Bronte Bags",
  }),
);
app.get("/giftcard", (req, res) =>
  res.render("products/giftcard", { title: "Gift Card - Bronte Bags" }),
);
app.get("/sale", (req, res) =>
  res.render("products/sale", { title: "SALE - Bronte Bags" }),
);

// ------------------ Routes ------------------

// Products
const productsRoutes = require("./src/routes/productsRoute");
app.use("/products", productsRoutes);

// Users
const userRoutes = require("./src/routes/userRoutes");
app.use("/users", userRoutes);

// ------------------ Carrito ------------------
app.get("/carrito", (req, res) => {
  res.render("users/carrito", { title: "Mi Carrito - Bronte Bags" });
});

// ------------------ Buscar ------------------
app.get("/buscar", (req, res) => {
  res.render("users/buscar", { title: "Buscar - Bronte Bags" });
});

// ------------------ 404 ------------------
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
