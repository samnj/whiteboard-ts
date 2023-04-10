import { MutableRefObject } from 'react'

export default function initCanvas(
  canvas: HTMLCanvasElement | null,
  canvasCtx: MutableRefObject<CanvasRenderingContext2D | null>
) {
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasCtx.current = canvas.getContext('2d')
    if (canvasCtx.current) {
      canvasCtx.current.lineWidth = 4
      canvasCtx.current.lineCap = 'round'
      canvasCtx.current.lineJoin = 'round'
      canvasCtx.current.strokeStyle = 'white'
    }
  }
}
