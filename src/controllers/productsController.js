// src/controllers/productsController.js
const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const productsFile = path.join(__dirname, '..', 'data', 'products.json');
const productsImgDir = path.join(__dirname, '..', '..', 'public', 'img', 'products');

async function ensureDataFile() {
  try { await fs.mkdir(productsImgDir, { recursive: true }); } catch (err) { console.error(err); }
  try { await fs.access(productsFile); } catch (err) { await fs.writeFile(productsFile, '[]', 'utf8'); }
}

async function readProducts() {
  await ensureDataFile();
  const raw = await fs.readFile(productsFile, 'utf8');
  try { return JSON.parse(raw || '[]'); }
  catch (err) { console.error('JSON parse error', err); return []; }
}

async function writeProducts(products) {
  await ensureDataFile();
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2), 'utf8');
}

module.exports = {
  index: async (req, res) => {
    const productos = await readProducts();
    res.render('products/products', { title: 'Productos', productos });
  },

  create: (req, res) => {
    res.render('products/form', { 
      title: 'Crear producto',
      action: '/products/create',
      method: 'POST',
      product: null
    });
  },

  store: async (req, res) => {
    try {
      const productos = await readProducts();
      const file = req.file;
      const nuevo = {
        id: uuidv4(),
        name: req.body.name || 'Sin nombre',
        description: req.body.description || '',
        price: req.body.price ? Number(req.body.price) : 0,
        image: file ? `products/${file.filename}` : 'products/default.jpg',
        category: req.body.category || ''
      };
      productos.push(nuevo);
      await writeProducts(productos);
      return res.redirect('/products');
    } catch (err) {
      console.error('Error en store:', err);
      return res.status(500).send('Error guardando producto');
    }
  },

  edit: async (req, res) => {
    try {
      const productos = await readProducts();
      const producto = productos.find(p => p.id === req.params.id);
      if (!producto) return res.status(404).send('Producto no encontrado');
      res.render('products/form', { 
        title: `Editar - ${producto.name}`, 
        action: `/products/edit/${producto.id}`, 
        method: 'POST',
        product: producto 
      });
    } catch (err) {
      console.error('Error en edit:', err);
      return res.status(500).send('Error leyendo producto');
    }
  },

  update: async (req, res) => {
    try {
      const productos = await readProducts();
      const idx = productos.findIndex(p => p.id === req.params.id);
      if (idx === -1) return res.status(404).send('Producto no encontrado');

      const file = req.file;
      productos[idx].name = req.body.name || productos[idx].name;
      productos[idx].description = req.body.description || productos[idx].description;
      productos[idx].price = req.body.price ? Number(req.body.price) : productos[idx].price;
      productos[idx].category = req.body.category || productos[idx].category;
      if (file) productos[idx].image = `products/${file.filename}`;

      await writeProducts(productos);
      return res.redirect('/products/' + productos[idx].id);
    } catch (err) {
      console.error('Error en update:', err);
      return res.status(500).send('Error actualizando producto');
    }
  },

  detail: async (req, res) => {
    try {
      const productos = await readProducts();
      const producto = productos.find(p => p.id === req.params.id);
      if (!producto) return res.status(404).send('Producto no encontrado');
      res.render('products/detail', { title: producto.name, producto });
    } catch (err) {
      console.error('Error en detail:', err);
      return res.status(500).send('Error mostrando detalle');
    }
  },

  destroy: async (req, res) => {
    try {
      let productos = await readProducts();
      productos = productos.filter(p => p.id !== req.params.id);
      await writeProducts(productos);
      return res.redirect('/products');
    } catch (err) {
      console.error('Error en destroy:', err);
      return res.status(500).send('Error eliminando producto');
    }
  }
};
