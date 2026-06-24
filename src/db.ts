// src/db.ts
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db: Database.Database = new Database(process.env.DB_PATH || './my-todo.db');

// 创建 users 表（原有）
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// 创建 tasks 表（新增）
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log('✅ 数据库表已就绪');
export default db;