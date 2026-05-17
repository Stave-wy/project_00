import fs from 'fs/promises'

// async function writeFileDemo(){
//     try{
//         const content = 'Hello, Node.js 文件系统'
//         const filePath = './hello.txt'
//         await fs.writeFile(filePath, content)
//         console.log(`文件已写入：${filePath}`)
//     }catch(error){
//         if(error instanceof Error){
//             console.error(`写入失败：${error.message}`)
//         }
//     }
// }

// writeFileDemo()

// async function writeJsonDemo(){
//     try{
//         const user = {
//             name: '小明',
//             age: 12,
//             email: '422279788@qq.com'
//         }
//         const jsonContent = JSON.stringify(user, null, 2)
//         await fs.writeFile('./user.json',jsonContent)
//         console.log("JSON文件已写入：user.json")
//     }catch(error){
//         if(error instanceof Error){
//             console.error(`写入失败：${error.message}`)
//         }
//     }
// }

// writeJsonDemo()

// async function fileReadDemo(){
//     try{
//         const content = await fs.readFile('./hello.txt')
//         console.log(`文件读取成功：${content}`)
//     }catch(error){
//         if(error instanceof Error){
//             console.error(`读取失败：${error.message}`)
//         }
//     }
// }

// fileReadDemo()

async function jsonReadDemo(){
    try{
        const jsonContent = await fs.readFile('./user.json', 'utf-8')
        const user = JSON.parse(jsonContent)
        console.log(`用户名：${user.name}`)
        console.log(`年龄：${user.age}`)
    }catch(error){
        if(error instanceof Error){
            console.error(`读取失败：${error.message}`)
        }
    }
}

jsonReadDemo()