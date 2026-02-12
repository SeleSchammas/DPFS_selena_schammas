USE bronte_bags;

-- ===============================
-- CATEGORIES
-- ===============================
INSERT INTO categories (name) VALUES
('Carteras'),
('Mochilas'),
('Gafas');

-- ===============================
-- PRODUCTS
-- ===============================
INSERT INTO products (name, description, price, image, category_id) VALUES
('Bag Romana', 'Cartera elegante de uso diario', 26500, 'romana.jpg', 1),
('Bag Chic Negra', 'Cartera negra minimalista', 26500, 'chic-negra.jpg', 1),
('Margot Verde', 'Mochila urbana color verde', 35800, 'margot-verde.jpg', 2),
('Gafas Metálicas', 'Lentes de sol metálicos', 10000, 'gafas-metal.jpg', 3);

-- ===============================
-- USERS (opcional – ejemplo)
-- password: 123456 (sin hash por ahora)
-- ===============================
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@brontebags.com', '123456', 'admin'),
('Usuario Test', 'user@brontebags.com', '123456', 'user');