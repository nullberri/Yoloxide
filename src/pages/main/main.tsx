import { Grid, styled } from "@material-ui/core"
import React, { useState, useCallback } from "react"
import { Device } from "shared/models/device"
import { DeviceTabs } from "./device-tabs"
import { DeviceControls } from "./device-toolbar"
import { Editor } from "./editor"
import { ExecutionHistoryList } from "./execution-history"
import { useDevice } from "shared/hooks/use-devices"

const FlexExpand = styled("div")({
    flex: "1 1 auto",
    width: "100%",
    overflow: "hidden",
})

const FlexColumn = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
    width: "100%",
    overflow: "hidden",
})

export const MainPage: React.FC = (props) => {
    const [selectedDevice, setSelectedDevice] = useState<Device>()
    const {setCode} = useDevice()

    const onCodeChanged = useCallback((code:string)=>{
        if(selectedDevice?.id){
            setCode(selectedDevice.id, code)
        }
    },[selectedDevice, setCode])

    return (
        <FlexColumn>
            <DeviceTabs onChanged={setSelectedDevice} />
            {selectedDevice && <DeviceControls device={selectedDevice} />}
            {selectedDevice && (
                <FlexExpand>
                    <Grid container style={{ height: "100%" }}>
                        <Grid xs={12} xl={4} item style={{ padding: 8 }}>
                            <Editor code={selectedDevice.code} highlightedRow={selectedDevice.executionHistory[0].line} onCodeChanged={onCodeChanged} readonly={false}/>
                        </Grid>
                        <Grid xs={12} xl={2} item style={{ height: "100%", overflow: "auto" }}>
                            <ExecutionHistoryList executionHistory={selectedDevice.executionHistory} />
                        </Grid>
                    </Grid>
                </FlexExpand>
            )}
        </FlexColumn>
    )
}
