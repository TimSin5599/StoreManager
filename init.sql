CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
	"allowGroups" TEXT[] DEFAULT ARRAY['admin']
);

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
	image VARCHAR(255),
    quantity INT NOT NULL CHECK (quantity >= 0),
	unit VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) CHECK (price >= 0),
	CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password TEXT NOT NULL,
    "group" VARCHAR NOT NULL DEFAULT 'user',
    "avatarUrl" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, "allowGroups")
VALUES
    ('Смартфоны', ARRAY['admin', 'user']),
    ('Ноутбуки', ARRAY['admin']),
    ('Аксессуары', ARRAY['admin', 'user', 'guest']),
    ('Телевизоры', ARRAY['admin', 'user']);

INSERT INTO products (name, description, category_id, image, quantity, unit, price)
VALUES
    ('Apple iPhone 15', 'Смартфон с OLED-дисплеем и 5G', 1, 'iphone15.jpg', 50, 'шт', 999.99),
    ('Samsung Galaxy S23', 'Флагманский смартфон с AMOLED-экраном', 2, 'galaxy_s23.jpg', 70, 'шт', 899.50),
    ('Xiaomi Redmi Note 12', 'Доступный смартфон с мощным процессором', 3, 'redmi_note12.jpg', 100, 'шт', 299.99),
    ('MacBook Pro 14', 'Ноутбук с процессором M2 Pro и Retina-экраном', 2, 'macbook_pro.jpg', 20, 'шт', 1999.00),
    ('ASUS ROG Zephyrus G14', 'Игровой ноутбук с AMD Ryzen и RTX 3060', 2, 'rog_zephyrus.jpg', 15, 'шт', 1499.99),
    ('Logitech MX Master 3', 'Беспроводная мышь с точным сенсором', 3, 'mx_master_3.jpg', 200, 'шт', 99.99),
    ('Apple AirPods Pro 2', 'Беспроводные наушники с шумоподавлением', 3, 'airpods_pro_2.jpg', 150, 'шт', 249.99),
    ('Samsung 55-inch QLED TV', '4K-телевизор с HDR и Smart TV', 4, 'samsung_qled.jpg', 30, 'шт', 699.99),
    ('Sony WH-1000XM5', 'Беспроводные наушники с ANC', 3, 'sony_wh1000xm5.jpg', 100, 'шт', 349.99),
    ('Lenovo ThinkPad X1 Carbon', 'Бизнес-ноутбук с Intel i7 и SSD', 2, 'thinkpad_x1.jpg', 25, 'шт', 1699.00);