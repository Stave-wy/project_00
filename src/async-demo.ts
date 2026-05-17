// console.log('1.开始请求---------')

// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(data => {
//     console.log("2.收到数据：",data)
// })
// .catch(error => {
//     console.error(`请求失败，${error}`);
// })
// console.log("3.请求已发出，继续执行后续代码-------")

// console.log("===Promise写法===")

// const fetchPromise: Promise<Response> = fetch('https://jsonplaceholder.typicode.com/todos/1')
// fetchPromise
// .then(response => {
//     if(!response.ok){
//         throw new Error(`HTTP error! status:${response.status}`)
//     }
//     return response.json()
// })
// .then((data: any) => {
//     console.log("解析后的数据：",data)
// })
// .catch((error: Error) => {
//     console.error("出错了：",error.message)
// })

async function fetchToDo(){
    console.log("1.[async]开始捕获数据=======")
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if(!response.ok){
            throw new Error(`请求失败，状态码：${response.status}`)
        }
        const data = await response.json()
        console.log("2.[async]获取成功：", data)
    }catch(error){
        if(error instanceof Error){
            console.error("3.[async]出错了",error.message)
        }else{
            console.error("3.[async]出错了",error)
        }
    }
}
fetchToDo()
console.log("4.[async]函数已调用，主程序继续运行......")