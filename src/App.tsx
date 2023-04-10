import { useEffect, useRef } from 'react'
import StylesPanel from './components/StylesPanel'
import ToolsPanel from './components/ToolsPanel'
import useCanvasStore from './store'
import distancePointerLine from './utils/distancePointerLine'
import draw from './utils/draw'
import initCanvas from './utils/initCanvas'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawingCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [
    initCanvasStore,
    activeTool,
    addStrokePoint,
    commitSnapshot,
    eraseDrawing,
    style,
    strokePoints,
    history,
    index,
    canvas,
    ctx,
    drawingCanvas,
    drawingCtx,
  ] = useCanvasStore((state) => [
    state.initCanvasStore,
    state.activeTool,
    state.addStrokePoint,
    state.commitSnapshot,
    state.eraseDrawing,
    state.style,
    state.strokePoints,
    state.history,
    state.index,
    state.canvas,
    state.ctx,
    state.drawingCanvas,
    state.drawingCtx,
  ])

  const isMouseDownRef = useRef(false)

  function handleMouseDown(e: React.MouseEvent) {
    isMouseDownRef.current = true
    if (activeTool === 'pencil') {
      addStrokePoint([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
    }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isMouseDownRef.current) return

    if (activeTool === 'pencil') {
      addStrokePoint([e.nativeEvent.offsetX, e.nativeEvent.offsetY])

      if (drawingCanvas && drawingCtx) {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)
        draw(drawingCtx, strokePoints, style)
      }
    }

    if (activeTool === 'eraser') handleEraser(e)
  }

  function handleMouseUp() {
    if (activeTool === 'pencil' && drawingCanvas && drawingCtx) {
      drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)
      draw(drawingCtx, strokePoints, style)
      commitSnapshot()
    }
    isMouseDownRef.current = false
  }

  function handleEraser(e: React.MouseEvent) {
    if (!history.length) return

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY
    const MIN_DISTANCE = 10

    const candidates = history[index].filter(({ boundingBox }) => {
      if (!boundingBox) return false

      const { minX, maxX, minY, maxY } = boundingBox

      return x > minX - 10 && x < maxX + 10 && y > minY - 10 && y < maxY + 10
    })

    candidates.forEach((candidate) => {
      if (candidate.strokePoints.length === 2) {
        const A = [candidate.strokePoints[0], candidate.strokePoints[1]]
        if (distancePointerLine([x, y], A, A) < MIN_DISTANCE) {
          eraseDrawing(candidate)
          return
        }
      }

      for (let i = 0; i < candidate.strokePoints.length - 4; i += 2) {
        const A = [candidate.strokePoints[i], candidate.strokePoints[i + 1]]
        const B = [candidate.strokePoints[i + 2], candidate.strokePoints[i + 3]]

        if (distancePointerLine([x, y], A, B) < MIN_DISTANCE) {
          eraseDrawing(candidate)
          return
        }
      }
    })
  }

  useEffect(() => {
    initCanvas(canvasRef.current, ctxRef)
    initCanvas(drawingCanvasRef.current, drawingCtxRef)
    initCanvasStore(
      canvasRef.current,
      ctxRef.current,
      drawingCanvasRef.current,
      drawingCtxRef.current
    )
  }, [initCanvasStore])

  useEffect(() => {
    if (!(canvas && ctx && drawingCanvas && drawingCtx)) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)

    if (index === -1) return

    history[index].forEach((drawing) =>
      draw(ctx, drawing.strokePoints, drawing.style)
    )
  }, [canvas, ctx, drawingCanvas, drawingCtx, history, index])

  return (
    <div>
      <StylesPanel />
      <ToolsPanel />
      <canvas
        ref={drawingCanvasRef}
        className='absolute z-10 cursor-crosshair bg-transparent'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <canvas ref={canvasRef} className='relative z-0 bg-gray-600' />
    </div>
  )
}

export default App
