const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");

const User = {
  // Lee todos los usuarios del archivo
  getAll: function () {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return data ? JSON.parse(data) : [];
  },

  // Busca un usuario por email
  findByEmail: function (email) {
    const users = this.getAll();
    return users.find((user) => user.email === email);
  },

  // Busca un usuario por ID
  findById: function (id) {
    const users = this.getAll();
    return users.find((user) => user.id === id);
  },

  // Crea un nuevo usuario
  create: function (userData) {
    const users = this.getAll();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: userData.name,
      email: userData.email,
      password: bcrypt.hashSync(userData.password, 10),
      role: userData.role || "user",
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    return newUser;
  },

  // Valida el login del usuario
  validateLogin: function (email, password) {
    const user = this.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  },
};

module.exports = User;
