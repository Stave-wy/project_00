import * as fs from 'fs/promises'
import path from 'path'

interface StudentData {
    name: string
    score: number
    age: number
}

async function analyzeCSV() {
    try {
        // 1. 读取 CSV 文件
        const csvContent = await fs.readFile('./data.csv', 'utf-8')
        console.log('读取文件成功')
        
        // 2. 按行分割
        const lines: string[] = csvContent.trim().split('\n')
        const headers = lines[0]!.split(',')  // ['name', 'score', 'age']
        
        // 3. 解析数据
        const students: StudentData[] = []
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i]!.split(',')
            students.push({
                name: values[0]!,
                score: parseInt(values[1]!),
                age: parseInt(values[2]!)
            })
        }
        
        // 4. 计算成绩平均值
        const totalScore = students.reduce((sum, s) => sum + s.score, 0)
        const avgScore = totalScore / students.length
        
        // 5. 找出最高分和最低分
        const scores = students.map(s => s.score)
        const maxScore = Math.max(...scores)
        const minScore = Math.min(...scores)
        
        // 6. 输出结果
        const result = `
CSV 分析结果
============
总人数: ${students.length}
平均分: ${avgScore.toFixed(2)}
最高分: ${maxScore}
最低分: ${minScore}
        `
        console.log(result)
        
        // 7. 写入结果文件
        await fs.writeFile('./analysis-result.txt', result.trim(), 'utf-8')
        console.log('结果已保存到 analysis-result.txt')
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('出错了:', error.message)
        }
    }
}

analyzeCSV()