import { YololDevice, YololEnvironment, YololVariable } from "./models/yoloxide"
import { Device } from "./models/device"
import { nanoid } from "@reduxjs/toolkit"
import("yoloxide").then(({ wasm_execute_line }) => {
    stepDevice = wasm_execute_line
})

let stepDevice: undefined | ((env: YololDevice, code: string) => YololDevice) = undefined

const newLines = new Array<string>(20).fill("\n")
export const padCode = (code: string) => {
    const lines = code.split("\n")
    const paddedLines = lines
        .concat(newLines)
        .slice(0, 20)
    console.log("paddedLines", paddedLines)
    const joinedLines = paddedLines.join("")
    console.log(joinedLines.length)
    return joinedLines
}

export const getLine = (code: string, lineNum: number) => {
    const lines = code.split("\n")
    return lines[lineNum - 1] ?? ""
}

export const formatYololVariable = (variable: YololVariable) => {
    return variable.NumberVal ? variable.NumberVal : `"${variable.StringVal}"`
}

export interface RunLineResult {
    nextLineNumber: number
    localEnv: YololEnvironment
    globalEnv: YololEnvironment
    error: string
}

export const runLine = (
    oneLine: string,
    lineNumber: number,
    localEnv: YololEnvironment,
    globalEnv: YololEnvironment
): RunLineResult => {
    if (!stepDevice) {
        throw new Error("Emulator not loaded")
    }
    const env: YololDevice = {
        next_line: lineNumber,
        local_context: localEnv,
        global_context: globalEnv,
        name: "",
        version: "0.3.2",
        error: "",
    }

    const nextEnv = stepDevice(env, oneLine)

    return {
        nextLineNumber: nextEnv.next_line,
        localEnv: nextEnv.local_context,
        globalEnv: nextEnv.global_context,
        error: nextEnv.error,
    }
}

export const defaultExecutionHistory = ()=>[ {
    tick: 0,
    line: -1,
    localEnv: {},
    nextLine: 1,
}]

export function createDevice(name?: string): Device {
    return {
        id: nanoid(10),
        code: "",
        name: name ?? "new Device",
        errors: [],
        executing: false,
        executionHistory: defaultExecutionHistory(),
        ticks: 0,
    }
}