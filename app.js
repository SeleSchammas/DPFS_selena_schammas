const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// ------------------ Settings / view engine ------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// --- DEBUG ---
const viewsDir = path.join(__dirname, 'src', 'views');
console.log('DEBUG → Express buscará vistas en:', viewsDir);
console.log('DEBUG → index.ejs existe?:', fs.existsSync(path.join(viewsDir, 'index.ejs')));
try {
  console.log('DEBUG → contenido src/views:', fs.readdirSync(viewsDir));
} catch (e) {
  console.log('DEBUG → lectura src/views falló:', e.message);
}

// ------------------ Middlewares ------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ------------------ Rutas principales ------------------

// Home
app.get('/', (req, res) => {
  res.render('index', { title: 'Home - Bronte Bags' });
});

// Secciones
app.get('/productos', (req, res) => res.render('products/todos', { title: 'Productos - Bronte Bags' }));
app.get('/carteras', (req, res) => res.render('products/carteras', { title: 'Carteras - Bronte Bags' }));
app.get('/mochilas', (req, res) => res.render('products/mochilas', { title: 'Mochilas - Bronte Bags' }));
app.get('/gafas', (req, res) => res.render('products/gafas', { title: 'Gafas Unisex - Bronte Bags' }));
app.get('/accesorios', (req, res) => res.render('products/accesorios', { title: 'Accesorios Unisex - Bronte Bags' }));
app.get('/giftcard', (req, res) => res.render('products/giftcard', { title: 'Gift Card - Bronte Bags' }));
app.get('/sale', (req, res) => res.render('products/sale', { title: 'SALE - Bronte Bags' }));

// Usuarios
app.get('/cuenta', (req, res) => res.render('users/cuenta', { title: 'Mi Cuenta - Bronte Bags' }));
app.get('/carrito', (req, res) => res.render('users/carrito', { title: 'Carrito - Bronte Bags' }));
app.get('/buscar', (req, res) => res.render('users/buscar', { title: 'Buscar - Bronte Bags' }));

// Montar routes de products
const productsRoutes = require('./src/routes/productsRoute');
app.use('/products', productsRoutes);


// // ------------------ Ruta dinámica de productos individuales ------------------
// function beautifySlug(slug) {
//   // Reemplaza guiones y guiones bajos por espacios, quita extensión y capitaliza cada palabra
//   return slug
//     .replace(/\.(ejs|html|es|htm)$/i, '') // elimina extensión si la hubiera
//     .replace(/[_\-]+/g, ' ')              // convierte _ o - en espacio
//     .trim()
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }

// app.get('/products/:name', (req, res) => {
//   const productName = req.params.name; 
//   const filePath = path.join(__dirname, 'src', 'views', 'products', `${productName}.ejs`);

//   console.log('DEBUG -> Buscando file:', filePath);
//   console.log('DEBUG -> Exists?:', fs.existsSync(filePath));

//   if (fs.existsSync(filePath)) {
//     const displayName = beautifySlug(productName); // "Bag Chic Black"
//     res.render(`products/${productName}`, { 
//       title: `${displayName} - Bronte Bags`,
//       productSlug: productName,
//       productNameDisplay: displayName
//     }, (err, html) => {
//       if (err) {
//         console.error('ERROR renderizando EJS:', err);
//         return res.status(500).send('Error interno al renderizar (ver consola)');
//       }
//       res.send(html);
//     });
//   } else {
//     res.status(404).send('Página no encontrada');
//   }
// });

// ------------------ 404 ------------------
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// ------------------ Start ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
