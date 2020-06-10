import { actions, deviceAdapter } from "store/devices"
import { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Device } from "shared/models/device"
import { Store } from "shared/models/store"
import { stepDeviceForwardThunk, stepDeviceBackThunk } from "store/devices/thunk"
import { ExecutionMode } from "shared/models/util"
import { useInterval } from "./use-interval"
import { createDevice } from "shared/util"

export function useDevice() {
    const dispatch = useDispatch()
 
    const setCode = useCallback(
        (deviceId: string, code: string) => {
            dispatch(
                actions.updateDevice({
                    id: deviceId,
                    changes: { code },
                })
            )
        },
        [dispatch]
    )

    return { setCode }
}

export function useDevices() {
    const dispatch = useDispatch()
    const selectors = useMemo(() => deviceAdapter.getSelectors<Store>((x) => x.devices), [])
    const devices = useSelector(selectors.selectAll)
    const [executionMode, setExecutionMode] = useState<ExecutionMode>("none")

    const addDevice = useCallback(() => {
        dispatch(actions.addDevice(createDevice("New Device " + devices.length)))
    }, [dispatch, devices])

    const removeDevice = useCallback(
        (deviceId: string) => {
            dispatch(actions.removeDevice(deviceId))
        },
        [dispatch]
    )

    const updateDevice = useCallback(
        (id: string, device: Partial<Device>) => {
            dispatch(
                actions.updateDevice({
                    id: id,
                    changes: device,
                })
            )
        },
        [dispatch]
    )

    const stepDeviceForward = useCallback(
        (id: string) => {
            dispatch(stepDeviceForwardThunk(id))
        },
        [dispatch]
    )

    const stepDeviceBack = useCallback(
        (id: string) => {
            dispatch(stepDeviceBackThunk(id))
        },
        [dispatch]
    )

    const runAllDevices = useCallback(() => {
        stepDeviceForward(devices[0].id)
    }, [stepDeviceForward, devices])

    const interval = executionMode === "running" ? 200 : undefined
    useInterval(runAllDevices, interval)

    return {
        addDevice,
        removeDevice,
        updateDevice,
        devices,
        stepDeviceForward,
        stepDeviceBack,
        setExecutionMode,
        executionMode,
    }
}
