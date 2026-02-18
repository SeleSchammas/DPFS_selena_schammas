const db = require("../../database/models");
const apiUsersController = {
  //Listado de usuarios
  list: async (req, res) => {
    try {
      // Paginado
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      // Obtener usuarios paginados
      const { count, rows: users } = await db.User.findAndCountAll({
        attributes: ["id", "name", "email"], // se excluye info sensible
        order: [["id", "ASC"]],
        limit,
        offset,
      });

      const baseUrl = `${req.protocol}://${req.get("host")}/api/users`;
      const totalPages = Math.ceil(count / limit);

      return res.json({
        count,
        users: users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          detail: `${req.protocol}://${req.get("host")}/api/users/${user.id}`,
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
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
  },

  // Detalle de un usuario
  detail: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: { exclude: ["password", "role", "createdAt", "updatedAt"] },
      });

      if (!user) {
        return res.status(404).json({ error: "Error al obtener usuario" });
      }

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
          ? `${req.protocol}://${req.get("host")}/img/${user.image}`
          : null,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener usuario" });
    }
  },
};

module.exports = apiUsersController;
