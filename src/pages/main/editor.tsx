import {} from "@react-hook/debounce"
import React, { useRef } from "react"
import AceEditor from "react-ace"
import AutoSizer from "react-virtualized-auto-sizer"
import { useAnnotations, useCursorPosition, useMarkers } from "./hooks"

export const Editor: React.FC<{
    code: string
    onCodeChanged: (code: string) => void
    highlightedRow: number
    readonly: boolean
}> = (props) => {
    const { code, onCodeChanged, highlightedRow, readonly } = props
    const ref = useRef<AceEditor>(null)

    useAnnotations(code, ref)
    useMarkers(highlightedRow, ref)

    const setCursorPosition = useCursorPosition(ref)

    return (
        <AutoSizer>
            {({ width }) => {
                return (
                    <AceEditor
                        ref={ref}
                        width={width + "px"}
                        mode="javascript"
                        theme="github"
                        onLoad={() => setImmediate(() => setCursorPosition(0))}
                        name="code-editor"
                        value={code}
                        onChange={onCodeChanged}
                        readOnly={readonly}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        setOptions={{
                            showLineNumbers: true,
                            tabSize: 2,
                            printMarginColumn: 70,
                            useWorker: false,
                        }}
                        editorProps={{
                            $blockScrolling: true,
                        }}
                    />
                )
            }}
        </AutoSizer>
    )
}
