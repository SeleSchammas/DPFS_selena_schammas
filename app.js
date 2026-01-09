const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");

// ------------------ Settings / view engine ------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// --- DEBUG ---
const viewsDir = path.join(__dirname, "src", "views");
console.log("DEBUG → Express buscará vistas en:", viewsDir);
console.log(
  "DEBUG → index.ejs existe?:",
  fs.existsSync(path.join(viewsDir, "index.ejs"))
);
try {
  console.log("DEBUG → contenido src/views:", fs.readdirSync(viewsDir));
} catch (e) {
  console.log("DEBUG → lectura src/views falló:", e.message);
}

// ------------------ Middlewares ------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// ------------------ Session ------------------
app.use(
  session({
    secret: "bronteSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

// 👉 Middleware que carga userLogged en todas las vistas
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware");
app.use(userLoggedMiddleware);

// ------------------ Rutas principales ------------------

// Home
app.get("/", (req, res) => {
  res.render("index", { title: "Home - Bronte Bags" });
});

// Secciones
app.get("/productos", (req, res) =>
  res.render("products/todos", { title: "Productos - Bronte Bags" })
);
app.get("/carteras", (req, res) =>
  res.render("products/carteras", { title: "Carteras - Bronte Bags" })
);
app.get("/mochilas", (req, res) =>
  res.render("products/mochilas", { title: "Mochilas - Bronte Bags" })
);
app.get("/gafas", (req, res) =>
  res.render("products/gafas", { title: "Gafas Unisex - Bronte Bags" })
);
app.get("/accesorios", (req, res) =>
  res.render("products/accesorios", {
    title: "Accesorios Unisex - Bronte Bags",
  })
);
app.get("/giftcard", (req, res) =>
  res.render("products/giftcard", { title: "Gift Card - Bronte Bags" })
);
app.get("/sale", (req, res) =>
  res.render("products/sale", { title: "SALE - Bronte Bags" })
);

// Montar routes de products
const productsRoutes = require("./src/routes/productsRoute");
app.use("/products", productsRoutes);

// Montar routes de users
const userRoutes = require("./src/routes/userRoutes");
app.use("/users", userRoutes);

// ------------------ Ruta dinámica de productos individuales ------------------
function beautifySlug(slug) {
  return slug
    .replace(/\.(ejs|html|es|htm)$/i, "")
    .replace(/[_\-]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

// ------------------ Start ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
