// console.log("---map---")
// const names = ["Alice", "Bob", "Stave"]
// const upperNames = names.map((name) => name.toUpperCase())
// console.log(upperNames)

// const users = [
//     {id: 1, name: "小明"},
//     {id: 2, name: "小红"},
//     {id: 3, name: "小芳"}
// ]
// const UserIds = users.map((user => user.id))
// console.log(UserIds)

// console.log("---filter---")
// const numbers = [1, 2, 3, 4, 5, 6]
// const evens = numbers.filter((n) => n % 2 === 0)
// console.log(evens)

// const ages = [18, 12, 25, 31, 11]
// const adults = ages.filter((age) => age >= 18)
// console.log(adults)

// const names1 = ["王刚", "王丽华", "李信"]
// const LongNames = names1.filter((name) => name.length > 2)
// console.log(LongNames)

// console.log("---reduce---")
// const numbers1 = [10, 20, 30, 40]
// const sum = numbers1.reduce((accumulator, current) => accumulator + current, 0)
// console.log(sum)

// const numbers2 = [43, 13, 25, 641, 145]
// const max = numbers2.reduce<number>((max, current) => (current > max ? current : max), numbers2[0]!)
// console.log(max)

// const fruits = ["苹果", "橘子", "香蕉", "橘子", "橘子", "苹果"]
// const count = fruits.reduce((acc, fruit) => {
//     acc[fruit] = (acc[fruit] || 0) + 1
//     return acc
// }, {} as Record<string, number>)
// console.log(count)

// console.log("---forEach---")
// const colors = ["红", "绿", "蓝"]
// colors.forEach((color) => {
//     console.log(`颜色：${color}`)
// })

// const number3 = [12, 14, 31, 36]
// let total = 0
// number3.forEach(i => {
//     total += i
// })
// console.log(total)

// const original = [1, 2, 3]
// const result: number[] = []
// original.forEach(i => {
//     result.push(i * 10)
// })
// console.log(result)

const animals = ["cat", "dog", "monkey"]
const UpperAnimals = animals.map(animal => animal.toUpperCase())
console.log(UpperAnimals)

const numbers = [17, 13, 5, 41, 25]
const numbers_10 = numbers.filter(number => number > 10)
console.log(numbers_10)

const numbers1 = [5, 10, 15]
const num = numbers1.reduce((num, number) => num * number, 1)
console.log(num)

const str = ["a", "b", "c"]
str.forEach((value, index) => {
    console.log(`索引${index}的值为${value}`)
})