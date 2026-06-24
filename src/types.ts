// src/types.ts
export interface Task {
    id: number
    title: string
    completed: number
    created_at: string
}

export interface User {
    id: number
    name: string
    email: string | null
    age: number | null
    created_at: string
}