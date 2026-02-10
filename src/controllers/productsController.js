const { Product, Category } = require("../database/models");

module.exports = {
  index: async (req, res) => {
    const productos = await Product.findAll({
      include: [{ model: Category, as: "category" }],
    });

    res.render("products/products", {
      title: "Productos",
      productos,
    });
  },

  create: async (req, res) => {
    const categories = await Category.findAll();

    res.render("products/form", {
      title: "Crear producto",
      action: "/products",
      method: "POST",
      product: {},
      categories,
      errors: {},
    });
  },

  store: async (req, res) => {
    try {
      const { name, price, description } = req.body;
      let categoryId =
        req.body.categoryId || req.body.category || req.body.category_id;

      const errors = {};

      if (!name) errors.name = "El nombre es obligatorio";
      if (!price || price <= 0) errors.price = "Precio inválido";
      if (!description) errors.description = "Debes ingresar una descripción";

      // 🔹 Si la categoría viene como TEXTO, buscar su ID real
      if (categoryId && isNaN(categoryId)) {
        const category = await Category.findOne({
          where: { name: categoryId },
        });
        if (category) {
          categoryId = category.id;
        } else {
          errors.category = "Categoría inválida";
        }
      }

      if (!categoryId) {
        errors.category = "Debes seleccionar una categoría";
      }

      if (Object.keys(errors).length > 0) {
        const categories = await Category.findAll();
        return res.render("products/form", {
          title: "Crear producto",
          action: "/products/create",
          method: "POST",
          product: req.body,
          categories,
          errors,
        });
      }

      await Product.create({
        name,
        description,
        price,
        image: req.file
          ? `products/${req.file.filename}`
          : "products/default.jpg",
        category_id: categoryId,
      });

      return res.redirect("/products");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error creando producto");
    }
  },

  edit: async (req, res) => {
    const producto = await Product.findByPk(req.params.id);
    const categories = await Category.findAll();

    if (!producto) return res.status(404).send("Producto no encontrado");

    res.render("products/form", {
      title: `Editar - ${producto.name}`,
      action: `/products/${producto.id}?_method=PUT`,
      method: "POST",
      product: producto,
      categories,
      errors: {},
    });
  },

  update: async (req, res) => {
    try {
      const producto = await Product.findByPk(req.params.id);
      if (!producto) return res.status(404).send("Producto no encontrado");

      const { name, price, description } = req.body;
      const categoryId =
        req.body.categoryId || req.body.category || req.body.category_id;
      const errors = {};

      if (!name) errors.name = "El nombre es obligatorio";
      if (!price || price <= 0) errors.price = "Precio inválido";
      if (!description) errors.description = "La descripción es obligatoria";

      if (Object.keys(errors).length > 0) {
        const categories = await Category.findAll();
        return res.render("products/form", {
          title: `Editar - ${producto.name}`,
          action: `/products/${producto.id}?_method=PUT`,
          method: "POST",
          product: { ...producto.dataValues, ...req.body },
          categories,
          errors,
        });
      }

      await producto.update({
        name,
        description,
        price,
        category_id: categoryId,
        image: req.file ? `products/${req.file.filename}` : producto.image,
      });

      res.redirect("/products/" + producto.id);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error actualizando producto");
    }
  },

  detail: async (req, res) => {
    const producto = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    if (!producto) return res.status(404).send("Producto no encontrado");

    res.render("products/detail", {
      title: producto.name,
      producto,
    });
  },

  destroy: async (req, res) => {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");

    await producto.destroy();
    res.redirect("/products");
  },
};
