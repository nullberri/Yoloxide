export interface YololVariable  {
    StringVal?: string
    NumberVal?: number
}

export type YololEnvironment = Record<string, YololVariable>

export interface YololDevice {
    error: string
    global_context: YololEnvironment
    local_context: YololEnvironment
    name: string
    next_line: number
    version: string
}
