const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../controllers/productsController');
const multer = require('multer');

// Configuración de Multer (subidas a /public/img/products)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'public', 'img', 'products'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// ---------- RUTAS CONTROLADAS POR productsController ----------

// Listado (GET /products)
router.get('/', productsController.index);

// Crear producto
router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);

// Editar producto
router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', upload.single('image'), productsController.update);

// Detalle producto
router.get('/:id', productsController.detail);

// Eliminar producto
router.post('/delete/:id', productsController.destroy);

module.exports = router;

