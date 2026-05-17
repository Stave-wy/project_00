// src/db.ts
// import Database from 'better-sqlite3'

// // 创建或打开数据库文件（项目根目录下的 users.db）
// const db: Database.Database = new Database('./users.db')

// // 创建 users 表
// const createTable = db.prepare(`
//     CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL
//     )
// `)
// createTable.run()

// export default db

// import Database from 'better-sqlite3'

// const db: Database.Database = new Database('./users.db')

// console.log('正在执行建表语句...')
// // users 表结构
// db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         email TEXT UNIQUE,
//         age INTEGER,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
// `)
// console.log('建表语句执行完成')

// export default db

import Database from 'better-sqlite3'
import dotenv from 'dotenv'

// 加载 .env 文件
dotenv.config()

// 从环境变量读取数据库路径，如果没有则使用默认值
const dbPath = process.env.DB_PATH || './users.db'

console.log(`数据库路径: ${dbPath}`)

const db: Database.Database = new Database(dbPath)

// 创建表
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

export default db