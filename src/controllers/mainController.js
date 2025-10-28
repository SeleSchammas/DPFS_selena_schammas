const path = require('path');

module.exports = {
  home: (req, res) => {
    res.render('home', { title: 'Home' });
  },
  products: (req, res) => {
    res.render('products/index', { title: 'Productos' });
  }
};
