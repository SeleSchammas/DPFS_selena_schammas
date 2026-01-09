const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");

// ------------------ MULTER ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "public", "img", "products"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// ------------------ RUTAS SPRINT 4 ------------------

// Listado
router.get("/", productsController.index);

// Formulario de creación
router.get("/create", productsController.create);

// Acción de creación
router.post("/", upload.single("image"), productsController.store);

// Detalle
router.get("/:id", productsController.detail);

// Formulario de edición
router.get("/:id/edit", productsController.edit);

// Acción de edición
router.put("/:id", upload.single("image"), productsController.update);

// Eliminación
router.delete("/:id", productsController.destroy);

module.exports = router;
