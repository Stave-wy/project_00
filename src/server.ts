//重构API，并使用环境变量
import express from 'express'
import dotenv from 'dotenv'
import db from './db'
import cors from 'cors'
import { Task, User } from './types';

// 加载 .env 文件
dotenv.config()

const app = express()
app.use(cors())     //使用cors中间件(允许所有来源)
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

// ==================== 待办事项 API ====================

// 1. 获取所有任务（GET /tasks）
app.get('/tasks', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC');
        const tasks = stmt.all();
        res.json({ success: true, data: tasks });
    } catch (error) {
        console.error('获取任务失败:', error);
        res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// 2. 新增任务（POST /tasks）
app.post('/tasks', (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === '') {
            return res.status(400).json({ success: false, error: '标题不能为空' });
        }

        const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');
        const result = stmt.run(title.trim());

        const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error('创建任务失败:', error);
        res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// 3. 切换任务完成状态（PATCH /tasks/:id/toggle）
app.patch('/tasks/:id/toggle', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: 'ID 必须为数字' });
        }

        // 先查出当前任务
        const getStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const task = getStmt.get(id) as Task || undefined;
        if (!task) {
            return res.status(404).json({ success: false, error: '任务不存在' });
        }

        // 翻转完成状态
        const newCompleted = task.completed === 1 ? 0 : 1;
        const updateStmt = db.prepare('UPDATE tasks SET completed = ? WHERE id = ?');
        updateStmt.run(newCompleted, id);

        const updatedTask = getStmt.get(id);
        res.json({ success: true, data: updatedTask });
    } catch (error) {
        console.error('切换任务状态失败:', error);
        res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// 4. 删除任务（DELETE /tasks/:id）
app.delete('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: 'ID 必须为数字' });
        }

        const deleteStmt = db.prepare('DELETE FROM tasks WHERE id = ?');
        const result = deleteStmt.run(id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, error: '任务不存在' });
        }

        res.json({ success: true, message: '任务已删除' });
    } catch (error) {
        console.error('删除任务失败:', error);
        res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// ==================== 更新任务标题（PUT /tasks/:id） ====================
app.put('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: 'ID 必须为数字' });
        }
        if (!title || title.trim() === '') {
            return res.status(400).json({ success: false, error: '标题不能为空' });
        }

        const getStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
        const task = getStmt.get(id) as Task | undefined;
        if (!task) {
            return res.status(404).json({ success: false, error: '任务不存在' });
        }

        const updateStmt = db.prepare('UPDATE tasks SET title = ? WHERE id = ?');
        updateStmt.run(title.trim(), id);

        const updatedTask = getStmt.get(id) as Task;
        res.json({ success: true, data: updatedTask });
    } catch (error) {
        console.error('更新任务失败:', error);
        res.status(500).json({ success: false, error: '服务器错误' });
    }
});

// ========== 启动服务器 ==========
// const PORT = 3000

// 从环境变量读取端口
const PORT = parseInt(process.env.PORT || '3000', 10)
app.listen(PORT, () => {
    console.log('环境变量检查:')
    console.log('  PORT =', process.env.PORT)
    console.log('  DB_PATH =', process.env.DB_PATH)
    console.log('  NODE_ENV =', process.env.NODE_ENV)
    console.log(`服务已启动: http://localhost:${PORT}`)
    console.log(`环境: ${process.env.NODE_ENV || 'development'}`)
    console.log('\n可用接口:')
    console.log('  GET    /users')
    console.log('  GET    /users/:id')
    console.log('  POST   /users')
    console.log('  PUT    /users/:id')
    console.log('  DELETE /users/:id')
})