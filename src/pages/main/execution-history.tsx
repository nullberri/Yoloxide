import { Paper } from "@material-ui/core"
import React from "react"
import { ExecutionHistory } from "shared/models/device"
import { ExecutionHistoryEntry } from "./historyEntry"

export const ExecutionHistoryList: React.FC<{ executionHistory: ExecutionHistory[] }> = (props) => {
    const { executionHistory } = props

    const entries = executionHistory.slice(0, 20).map((x) => {
        return (
            <Paper style={{ margin: 5, marginBottom: 8, padding: 8 }}>
                <div key={x.tick}>
                    <span>Line: {x.line}</span>
                    <span>Tick: {x.tick}</span>
                    <span>Time: {new Date(x.tick * 200).toISOString().substr(11, 10)}</span>
                    <ExecutionHistoryEntry executionHistory={x} />
                </div>
            </Paper>
        )
    })
    return <>{entries}</>
}
