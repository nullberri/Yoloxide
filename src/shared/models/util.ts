import { ThunkAction, Action } from "@reduxjs/toolkit"
import { Store } from "./store"

export interface CodeError {
    message: string
    lineNumber: number
}

export type AppThunk = ThunkAction<void, Store, unknown, Action<string>>

export type ExecutionMode = "stepping" | "none" | "running"