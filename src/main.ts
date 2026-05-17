// 方式1：分别导入（推荐，按需导入）
import * as Utils from './utils'

// 方式2：导入所有，挂载到一个对象上（备选）
// import * as Utils from './utils.js'

const numbers = [1, 2, 3, 4, 5, 6]

// 使用导入的函数
const doubled = Utils.doubleNumbers(numbers)
Utils.logWithPrefix("测试", `原数组: ${numbers}`)
Utils.logWithPrefix("测试", `乘以2: ${doubled}`)

const evens = Utils.filterEvens(numbers)
Utils.logWithPrefix("测试", `偶数: ${evens}`)

const total = Utils.sumNumbers(numbers)
Utils.logWithPrefix("测试", `总和: ${total}`)

const odds = Utils.filterOdds(numbers)
Utils.logWithPrefix("测试", `奇数: ${odds}`)