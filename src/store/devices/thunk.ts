import { Device } from "shared/models/device"
import { Store } from "shared/models/store"
import { AppThunk } from "shared/models/util"
import { getLine, runLine } from "shared/util"
import { actions, deviceAdapter } from "./reducer"

const selectors = deviceAdapter.getSelectors<Store>((x) => x.devices)
export const runAllDevices: AppThunk = (dispatch, getState) => {}

export function runDevice(id: string): AppThunk {
    return (dispatch, getState) => {}
}

export function stepDeviceBackThunk(id: string): AppThunk {
    return (dispatch, getState) => {
        const device = selectors.selectById(getState(), id)
        if (!device) {
            throw new Error("Invalid Id")
        }

        if (device.executionHistory.length > 1) {
            dispatch(
                actions.updateDevice({
                    id,
                    changes: {
                        executionHistory: device.executionHistory.slice(1),
                    },
                })
            )
        }
    }
}

export function stepDeviceForwardThunk(id: string): AppThunk {
    return (dispatch, getState) => {
        const device = selectors.selectById(getState(), id)
        if (!device) {
            throw new Error("Invalid Id")
        }
        const { nextLine, localEnv } = device.executionHistory[0]
        const line = getLine(device.code, nextLine)
        const result = runLine(line, nextLine, localEnv, {})
        const nextDevice: Partial<Device> = {
            executionHistory: [
                {
                    tick: device.executionHistory[0].tick + 1,
                    line: nextLine,
                    nextLine: result.nextLineNumber,
                    code: line,
                    localEnv: result.localEnv,
                },
                ...device.executionHistory,
            ].slice(0, 1000),
        }

        if (result.error) {
            nextDevice.errors = device.errors.concat({
                lineNumber: nextLine,
                message: result.error,
            })
        }

        dispatch(actions.updateDevice({ id, changes: nextDevice }))
    }
}
