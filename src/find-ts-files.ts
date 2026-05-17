import * as fs from 'fs/promises'
import path from 'path'

async function findTsFiles(dir: string, files: string[] = []): Promise<string[]>{
    try{
        const entries = await fs.readdir(dir, {withFileTypes: true})
        for(const entry of entries){
            const fullPath = path.join(dir, entry.name)
            if(entry.isDirectory()){
                await findTsFiles(fullPath, files)
            }else if(entry.isFile() && entry.name.endsWith('.ts')){
                files.push(fullPath)
            }
        }
        return files
    }catch(error){
        if(error instanceof Error){
            console.error(`出错了：${error.message}`)
        }
        return []
    }
}

async function main(){
    console.log('正在查找所有.ts文件...\n')

    const tsFiles = await findTsFiles('./src')

    console.log(`找到个${tsFiles.length}TypeScript文件：`)
    console.log('='.repeat(50))

    tsFiles.forEach((file, index) => {
        console.log(`${index + 1}.${file}`)
    })
    const resultContent = tsFiles.join('\n')
    await fs.writeFile('./ts-files-list.txt', resultContent, 'utf-8')
    console.log('文件列表已保存到 ts-files-list.txt')
}

main()