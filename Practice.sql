-- SQLite
-- 创建用户表
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建订单表（用于后面的 JOIN 练习）
CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    price REAL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 插入单条数据
INSERT INTO users(name, email, age)
VALUES ('涂赋诗', 'tfs10060607@qq.com', '20');

-- 插入多条数据
INSERT INTO users(name, email, age) VALUES
('张三', 'zhangsan@qq.com', 21),
('李四', 'lisi@qq.com', 25),
('王五', 'wangwu@qq.com', 31);

-- 插入订单数据（关联用户）
INSERT INTO orders (user_id, product_name, price) VALUES 
(1, '笔记本电脑', 5999),
(1, '鼠标', 99),
(2, '键盘', 399),
(3, '显示器', 1299);

-- 查询所有用户
SELECT * FROM orders;

-- 查询指定列
SELECT id, name, email FROM users;

-- 带条件（WHERE）
SELECT * FROM users WHERE age > 21;

-- 排序（ORDER BY）
SELECT * FROM users ORDER BY age DESC;

-- 限制数量（LIMIT）
SELECT * FROM users LIMIT 2;

-- 查询每个订单对应的用户名（内连接）
SELECT 
    orders.id AS order_id,
    orders.product_name,
    orders.price,
    users.name AS user_name
FROM orders
JOIN users ON orders.user_id = users.id;

-- 左连接：显示所有用户，哪怕没有订单
SELECT 
    users.name,
    orders.product_name,
    orders.price
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- 更新单条数据
UPDATE users SET age = 26 WHERE name = '张三';

-- 更新多条
UPDATE users SET age = age + 1 WHERE age < 30;

-- 检查更新结果
SELECT * FROM users;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;