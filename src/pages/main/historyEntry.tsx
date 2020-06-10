import React from "react"
import { Table, TableHead, TableRow, TableBody, TableCell } from "@material-ui/core"
import { ExecutionHistory } from "shared/models/device"
import { formatYololVariable } from "shared/util"

export const ExecutionHistoryEntry: React.FC<{ executionHistory: ExecutionHistory }> = (props) => {
    const { executionHistory } = props
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.entries(executionHistory.localEnv)
                    .sort(([a], [b]) => {
                        return a.localeCompare(b)
                    })
                    .map(([name, value]) => {
                       
                        return (
                            <TableRow key={name}>
                                <TableCell>{name}</TableCell>
                                <TableCell>{formatYololVariable(value)}</TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
        </Table>
    )
}
