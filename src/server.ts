// import { error } from 'console'
// import express from 'express'
// import db from './db'

// // 创建一个 Express 应用实例
// const app = express()
// app.use(express.json())

// // ========== 新增用户（INSERT）==========
// app.post('/users', (req, res) => {
//     const { name } = req.body

//     if (!name) {
//         return res.status(400).json({ error: 'name 字段不能为空' })
//     }

//     try {
//         // 预编译 SQL，防止 SQL 注入
//         const insertStmt = db.prepare('INSERT INTO users (name) VALUES (?)')
//         const result = insertStmt.run(name)

//         res.json({
//             message: '用户创建成功',
//             user: {
//                 id: result.lastInsertRowid,  // 自动生成的 ID
//                 name: name
//             }
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: '服务器错误' })
//     }
// })

// // ========== 查询所有用户（SELECT）==========
// app.get('/users', (req, res) => {
//     try {
//         const selectStmt = db.prepare('SELECT * FROM users')
//         const users = selectStmt.all()  // .all() 返回所有结果
        
//         res.json({
//             count: users.length,
//             users: users
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: '服务器错误' })
//     }
// })

// // ========== 查询单个用户（通过 id）==========
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id)

//     if (isNaN(id)) {
//         return res.status(400).json({ error: 'id 必须是数字' })
//     }

//     try {
//         const selectStmt = db.prepare('SELECT * FROM users WHERE id = ?')
//         const user = selectStmt.get(id)  // .get() 返回第一条或 undefined

//         if (!user) {
//             return res.status(404).json({ error: '用户不存在' })
//         }

//         res.json({ user })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: '服务器错误' })
//     }
// })

// // PUT /users/:id - 更新用户（全量更新）
// app.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name } = req.body;

//     if (isNaN(id)) {
//         return res.status(400).json({ error: '无效的用户ID' });
//     }
//     if (!name) {
//         return res.status(400).json({ error: '新用户名不能为空' });
//     }

//     try {
//         const updateStmt = db.prepare('UPDATE users SET name = ? WHERE id = ?');
//         const result = updateStmt.run(name, id);

//         if (result.changes === 0) { // changes 表示受影响的行数
//             return res.status(404).json({ error: '用户不存在' });
//         }

//         // 更新成功后，查询并返回最新的用户信息
//         const selectStmt = db.prepare('SELECT * FROM users WHERE id = ?');
//         const updatedUser = selectStmt.get(id);
//         res.json(updatedUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: '服务器内部错误' });
//     }
// });

// // DELETE /users/:id - 删除用户
// app.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);

//     if (isNaN(id)) {
//         return res.status(400).json({ error: '无效的用户ID' });
//     }

//     try {
//         const deleteStmt = db.prepare('DELETE FROM users WHERE id = ?');
//         const result = deleteStmt.run(id);

//         if (result.changes === 0) {
//             return res.status(404).json({ error: '用户不存在' });
//         }

//         // 204 No Content 表示操作成功，但没有需要返回的内容
//         res.status(204).send();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: '服务器内部错误' });
//     }
// });

// // 启动服务
// const PORT = 3000
// app.listen(PORT, () => {
//     console.log(`服务已启动: http://localhost:${PORT}`)
//     console.log('测试地址:')
//     console.log('  POST /users       - 创建用户 (Body: { "name": "张三" })')
//     console.log('  GET  /users       - 查询所有用户')
//     console.log('  GET  /users/1     - 查询单个用户')
// })

// // // 定义一个路由：当用户访问 /ping 时，返回 'pong'
// // app.get('/ping', (req, res) => {
// //     res.send('pong')
// // })

// // // 返回 JSON 数据
// // app.get('/user', (req, res) => {
// //     res.json({
// //         id: 1,
// //         name: '张三',
// //         email: 'zhangsan@example.com'
// //     })
// // })

// // // 带路径参数的路由
// // app.get('/user/:id', (req, res) => {
// //     const userId = req.params.id
// //     res.send(`查询用户，ID 为：${userId}`)
// // })

// // //多个路由参数
// // app.get('/user/:userId/post/:postId', (req, res) => {
// //     res.json({
// //         userId: req.params.userId,
// //         postId: req.params.postId
// //     })
// // })

// // //查询参数示例
// // app.get('/search', (req, res) => {
// //     //req.query 包含所有查询参数
// //     const keyword = req.query.keyword
// //     const page = req.query.page || 1
// //     const limit = req.query.limit || 10

// //     res.json({
// //         keyword: keyword,
// //         page: parseInt(page as string),
// //         limit: parseInt(limit as string),
// //         message: `搜索关键词"${keyword}"，第${page}页`
// //     })
// // })

// // // 新增 /time 接口
// // app.get('/time', (req, res) => {
// //     const now = new Date()
// //     res.send(`当前服务器时间：${now.toLocaleString()}`)
// // })

// // //POST请求示例 创建新用户
// // app.post('/user', (req, res) => {
// //     //req.body包含客户端发送的JSON数据
// //     const { name, email, age } = req.body
// //     //简单的数据验证
// //     if(!name || !email){
// //         return res.status(400).json({
// //             error: '缺少必要字段: name和email是必填的'
// //         })
// //     }
// //     res.json({
// //         message: '用户创建成功',
// //         user:{
// //             id: Date.now(),
// //             name: name,
// //             email: email,
// //             age: age || null
// //         }
// //     })
// // })

// // // 启动服务，监听 3000 端口
// // const PORT = 3000
// // app.listen(PORT, () =>{
// //     console.log(`服务器已启动，访问地址：http://localhost:${PORT}`)
// //     console.log('测试地址：')
// //     console.log('  GET  /user/123')
// //     console.log('  GET  /search?keyword=苹果')
// //     console.log('  POST /user (需要 JSON body)')
// // })


import express from 'express'
import dotenv from 'dotenv'
import db from './db'

interface User {
    id: number
    name: string
    email: string | null
    age: number | null
    created_at: string
}

// 加载 .env 文件
dotenv.config()

const app = express()
app.use(express.json())

// ========== 1. GET /users - 查询所有用户 ==========
app.get('/users', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM users ORDER BY id ASC')
        const users = stmt.all()
        
        res.json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (error) {
        console.error('GET /users 错误:', error)
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        })
    }
})

// ========== 2. GET /users/:id - 查询单个用户 ==========
app.get('/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        // 参数校验
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'id 必须是数字'
            })
        }
        
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
        const user = stmt.get(id)
        
        // 资源不存在
        if (!user) {
            return res.status(404).json({
                success: false,
                error: `用户 ${id} 不存在`
            })
        }
        
        res.json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error('GET /users/:id 错误:', error)
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        })
    }
})

// ========== 3. POST /users - 创建用户 ==========
app.post('/users', (req, res) => {
    try {
        const { name, email, age } = req.body
        
        // 参数校验
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'name 字段不能为空'
            })
        }
        
        if (email && !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'email 格式不正确'
            })
        }
        
        // 插入数据
        const stmt = db.prepare(
            'INSERT INTO users (name, email, age) VALUES (?, ?, ?)'
        )
        const result = stmt.run(name, email || null, age || null)
        
        // 查询新创建的用户
        const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
        
        res.status(201).json({
            success: true,
            message: '用户创建成功',
            data: newUser
        })
    } catch (error: any) {
        console.error('POST /users 错误:', error)
        
        // 处理唯一约束冲突（email 重复）
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({
                success: false,
                error: '邮箱已被注册'
            })
        }
        
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        })
    }
})

// ========== 4. PUT /users/:id - 全量更新用户 ==========
app.put('/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, email, age } = req.body
        
        // 参数校验
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'id 必须是数字'
            })
        }
        
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'name 字段不能为空'
            })
        }
        
        if (email && !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'email 格式不正确'
            })
        }
        
        // 检查用户是否存在
        const checkStmt = db.prepare('SELECT * FROM users WHERE id = ?')
        const existingUser = checkStmt.get(id)
        
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                error: `用户 ${id} 不存在`
            })
        }
        
        // 更新用户
        const updateStmt = db.prepare(
            'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?'
        )
        updateStmt.run(name, email || null, age || null, id)
        
        // 返回更新后的用户
        const updatedUser = checkStmt.get(id)
        
        res.json({
            success: true,
            message: '用户更新成功',
            data: updatedUser
        })
    } catch (error: any) {
        console.error('PUT /users/:id 错误:', error)
        
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({
                success: false,
                error: '邮箱已被其他用户使用'
            })
        }
        
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        })
    }
})

// ========== 5. DELETE /users/:id - 删除用户 ==========
app.delete('/users/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'id 必须是数字'
            })
        }
        
        // 检查用户是否存在
        const checkStmt = db.prepare('SELECT * FROM users WHERE id = ?')
        const existingUser = checkStmt.get(id) as User || undefined
        
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                error: `用户 ${id} 不存在`
            })
        }
        
        // 删除用户
        const deleteStmt = db.prepare('DELETE FROM users WHERE id = ?')
        deleteStmt.run(id)
        
        res.json({
            success: true,
            message: `用户 ${id} 已删除`,
            data: {
                id: id,
                name: existingUser.name
            }
        })
    } catch (error) {
        console.error('DELETE /users/:id 错误:', error)
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        })
    }
})

// ========== 辅助函数 ==========
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// ========== 启动服务器 ==========
// const PORT = 3000

// 从环境变量读取端口
const PORT = parseInt(process.env.PORT || '3000', 10)
app.listen(PORT, () => {
    console.log(`服务已启动: http://localhost:${PORT}`)
    console.log(`环境: ${process.env.NODE_ENV || 'development'}`)
    console.log('\n可用接口:')
    console.log('  GET    /users')
    console.log('  GET    /users/:id')
    console.log('  POST   /users')
    console.log('  PUT    /users/:id')
    console.log('  DELETE /users/:id')
})