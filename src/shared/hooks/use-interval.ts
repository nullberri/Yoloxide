import { useRef, useEffect } from "react"

const noop = () => {}
export function useInterval(callback: () => void, delay?: number, immediate?: boolean) {
    const savedCallback = useRef(noop)
    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        if (immediate && delay !== undefined) {
            savedCallback.current()
        }
    }, [immediate, delay])

    useEffect(() => {
        if (delay === undefined) {
            return
        }
        const tick = () => savedCallback.current()
        const id = setInterval(tick, delay)
        return () => clearInterval(id)
    })
}
