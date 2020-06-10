import { AppBar, Button, styled, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import { useDevices } from "shared/hooks/use-devices"

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

export const App: React.FC = (props) => {
    const {children} = props
    const {
        addDevice,
    } = useDevices()
   

    return (
        <FlexColumn>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Yolol Emulator</Typography>
                    <Button onClick={addDevice} color="inherit">
                        Add Device
                    </Button>
                </Toolbar>
            </AppBar>
            <FlexExpand>{children}</FlexExpand>
        </FlexColumn>
    )
}
