const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Página principal
router.get('/', mainController.home);

// Si querés mostrar todos los productos desde aquí:
router.get('/products', mainController.products);

// Páginas generales
router.get('/cuenta', (req, res) => res.render('users/cuenta'));
router.get('/buscar', (req, res) => res.render('users/buscar'));
router.get('/pedido', (req, res) => res.render('users/pedido'));

module.exports = router;
