import { useEffect, useRef, useState } from "react"

export const useDraw = (onDraw) => {
    const [mouseDown, setMouseDown] = useState(false)

    const canvasRef = useRef(null)
    const prevPoint = useRef(null)

    const onMouseDown = () => setMouseDown(true)

    useEffect(() => {

        const handler = (e) => {
            if (!mouseDown) return

            const currentPoint = computePointInCanvas(e)

            const ctx = canvasRef.current?.getContext('2d')
            if (!ctx || !currentPoint) return

            onDraw({ prevPoint: prevPoint.current, currentPoint, ctx })
            prevPoint.current = currentPoint
        }

        const computePointInCanvas = (e) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            return { x, y }
        }

        const mouseUpHandler = () => {
            setMouseDown(false)
            prevPoint.current = null
        }

        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)

        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [onDraw])

    return { canvasRef, onMouseDown }
}