import { CodeError } from "./util"
import { YololEnvironment } from "./yoloxide"

export interface Device {
    errors: CodeError[]
    id: string
    code: string
    name: string
    executing: boolean
    ticks: number
    executionHistory: ExecutionHistory[]
}

export interface ExecutionHistory {
    tick: number
    line: number
    nextLine: number
    localEnv: YololEnvironment
}
