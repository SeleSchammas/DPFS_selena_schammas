const db = require("../../database/models");

const apiProductsController = {
  list: async (req, res) => {
    try {
      // Paginado

      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      //Obtener todos los productos paginados
      const { count, rows: products } = await db.Product.findAndCountAll({
        include: ["category"], // Array de categorías
        order: [["id", "DESC"]],
        limit,
        offset,
      });

      //Obtener todas las categorías para countByCategory
      const categories = await db.Category.findAll({
        include: ["products"],
      });

      //Contador de productos por categorías
      const countByCategory = {};
      categories.forEach((category) => {
        countByCategory[category.name] = category.products.length;
      });

      //Último producto
      const lastProduct = await db.Product.findOne({
        include: ["category"],
        order: [["id", "DESC"]],
      });

      //URLs de paginado
      const baseUrl = `${req.protocol}://${req.get("host")}/api/products`;
      const totalPages = Math.ceil(count / limit);

      return res.json({
        count,
        countByCategory,
        lastProduct: lastProduct
          ? {
              id: lastProduct.id,
              name: lastProduct.name,
              price: lastProduct.price,
              description: lastProduct.description,
              categories: lastProduct.category
                ? [lastProduct.category.name]
                : [],
              detail: `${req.protocol}://${req.get("host")}/api/products/${lastProduct.id}`,
            }
          : null,
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          categories: product.category ? [product.category.name] : [],
          detail: `${req.protocol}://${req.get("host")}/api/products/${product.id}`,
        })),
        pagination: {
          current: page,
          next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
          previous: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
          totalPages,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener producto" });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: ["category"],
      });
      if (!product) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      return res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.category ? [product.category.name] : [],
        image: product.image
          ? `${req.protocol}://${req.get("host")}/img/${product.image}`
          : null,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error al obtener producto",
      });
    }
  },
};

module.exports = apiProductsController;
