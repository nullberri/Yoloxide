import { useEffect, useCallback } from "react"
import AceEditor, { IAnnotation } from "react-ace"
import { Range } from "ace-builds"
import { makeStyles, createStyles } from "@material-ui/core"

export const useAnnotations = (code: string, ref: React.MutableRefObject<AceEditor | null>) => {
    useEffect(() => {
        if (ref.current) {
            const lines = code.split("\n")
            const annotations: IAnnotation[] = []

            lines.forEach((line, index) => {
                if (index >= 20) {
                    annotations.push({
                        column: 0,
                        row: index,
                        text: "Error exceeding 20 lines, Line will not execute",
                        type: "error",
                    })
                }
                if (line.length > 70) {
                    annotations.push({
                        column: 0,
                        row: index,
                        text: "Warning exceeding 70 charactors",
                        type: "warning",
                    })
                }
            })
            const session = ref.current.editor.getSession()
            session.setAnnotations(annotations)
        }
    }, [code, ref])
}

const useStyles = makeStyles(
    createStyles({
        highlightRow: {
            backgroundColor: "rgba(0,0,255,0.1)",
            position: "absolute",
        },
    })
)

export const useMarkers = (line: number, ref: React.MutableRefObject<AceEditor | null>) => {
    const classes = useStyles()
    useEffect(() => {
        if (ref.current) {
            const session = ref.current.editor.getSession()
            const markers = Object.values(session.getMarkers())
            markers.forEach((x) => {
                x.type === "fullLine" && session.removeMarker(x.id)
            })
            const range = new Range(line, 0, line, 100)
            session.addMarker(range, classes.highlightRow, "fullLine", false)
            ref.current.editor.renderer.updateFrontMarkers()
        }
    }, [line,classes, ref])
}

export const useCursorPosition = (ref: React.MutableRefObject<AceEditor | null>)=>{
    return useCallback((row: number)=>{
        ref.current?.editor.moveCursorToPosition({column:0, row})
        ref.current?.editor.getSession().getSelection().clearSelection()
    },[ref])
}