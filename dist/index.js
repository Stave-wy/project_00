"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 定义一个函数，参数带类型注解
function greet(name) {
    return `Hello, ${name}!`;
}
// 调用函数
const message = greet("小明");
console.log(message);
// 尝试一个错误示范（TypeScript 会报错）
// greet(123)  // 这行会报错，因为参数必须是 string 类型
//# sourceMappingURL=index.js.map