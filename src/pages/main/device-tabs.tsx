import { Tab, Tabs, Toolbar } from "@material-ui/core"
import React, { useCallback, useState, useEffect } from "react"
import { useDevices } from "shared/hooks/use-devices"
import { Device } from "shared/models/device"

export const DeviceTabs: React.FC<{
    onChanged: (device: Device) => void
}> = (props) => {
    const { onChanged } = props
    const { devices } = useDevices()
    const [selectedDevice, setSelectedDevice] = useState<number>(0)

    const onChangeDevice = useCallback(
        (_: any, value: number) => {
            setSelectedDevice(value)
        },
        []
    )

    useEffect(()=>{
        onChanged(devices[selectedDevice])
    },[devices, onChanged, selectedDevice])

    return (
        <Toolbar>
            {devices.length > 0 && (
                <Tabs value={selectedDevice} onChange={onChangeDevice}>
                    {devices.map((device, index) => (
                        <Tab key={device.name} value={index} label={device.name} />
                    ))}
                </Tabs>
            )}
        </Toolbar>
    )
}
