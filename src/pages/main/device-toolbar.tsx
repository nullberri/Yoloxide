import { Button, TextField, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import { useDevices } from "shared/hooks/use-devices"
import { Device } from "shared/models/device"
import { defaultExecutionHistory } from "shared/util"

export const DeviceControls: React.FC<{ device: Device }> = (props) => {
    const { device } = props
    const {
        removeDevice,
        updateDevice,
        stepDeviceForward,
        stepDeviceBack,
        setExecutionMode,
        executionMode,
    } = useDevices()

    return (
        <Toolbar>
            <Button
                onClick={() => {
                    stepDeviceBack(device.id)
                }}
                variant="contained"
                color="primary">
                &lt;
            </Button>
            <Button
                onClick={() => {
                    stepDeviceForward(device.id)
                }}
                variant="contained"
                color="primary">
                &gt;
            </Button>
            <Button
                onClick={() => {
                    if (executionMode === "none") {
                        updateDevice(device.id, { executionHistory: defaultExecutionHistory() })
                        setExecutionMode("running")
                    } else {
                        setExecutionMode("none")
                    }
                }}
                variant="contained"
                color="secondary">
                Run Code
            </Button>

            <Typography>Device Name:</Typography>
            <TextField
                value={device.name}
                onChange={(event) => {
                    updateDevice(device.id, { name: event.target.value })
                }}
            />
            <Button
                onClick={() => {
                    removeDevice(device.id)
                }}>
                Delete Device
            </Button>
        </Toolbar>
    )
}
