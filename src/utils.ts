/**
 * 将数字数组中的每个元素乘以2
 */
export function doubleNumbers(numbers: number[]): number[] {
    return numbers.map(n => n * 2)
}

/**
 * 筛选出数组中的偶数
 */
export function filterEvens(numbers: number[]): number[] {
    return numbers.filter(n => n % 2 === 0)
}

/**
 * 计算数组所有元素的和
 */
export function sumNumbers(numbers: number[]): number {
    return numbers.reduce((acc, cur) => acc + cur, 0)
}

/**
 * 工具函数：打印带前缀的日志
 */
export function logWithPrefix(prefix: string, message: string): void {
    console.log(`[${prefix}] ${message}`)
}

/**
 * 筛选出数组中的奇数
 */
export function filterOdds(numbers: number[]): number[] {
    return numbers.filter(n => n % 2 !== 0)
}