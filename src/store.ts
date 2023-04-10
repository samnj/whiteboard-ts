import { create } from 'zustand'
import getBoundingBox from './utils/getBoundingBox'

type Coordinate = [number, number]

type BoundingBox = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

type Drawing = {
  id: string
  style: Style
  strokePoints: number[]
  boundingBox: BoundingBox
}

export type Style = {
  lineWidth: '4' | '8' | '12'
  strokeStyle: 'white' | 'red' | 'blue'
}

export type Tool = 'pencil' | 'eraser'

type CanvasRefs = {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  drawingCanvas: HTMLCanvasElement | null
  drawingCtx: CanvasRenderingContext2D | null
}

type State = {
  strokePoints: number[]
  history: Drawing[][]
  index: number
  style: Style
  activeTool: Tool
}

type Actions = {
  initCanvasStore: (
    canvas: CanvasRefs['canvas'],
    ctx: CanvasRefs['ctx'],
    drawingCanvas: CanvasRefs['drawingCanvas'],
    drawingCtx: CanvasRefs['drawingCtx']
  ) => void
  setActiveTool: (tool: Tool) => void
  setStyle: (style: Partial<State['style']>) => void
  addStrokePoint: (coordinate: Coordinate) => void
  commitSnapshot: () => void
  eraseDrawing: (drawingToDelete: Drawing) => void
  undo: () => void
  redo: () => void
  reset: () => void
}

const initialState: State = {
  strokePoints: [],
  history: [],
  index: -1,
  style: {
    lineWidth: '4',
    strokeStyle: 'white',
  },
  activeTool: 'pencil',
}

const useCanvasStore = create<CanvasRefs & State & Actions>()((set) => ({
  canvas: null,
  ctx: null,
  drawingCanvas: null,
  drawingCtx: null,
  ...initialState,

  initCanvasStore: (canvas, ctx, drawingCanvas, drawingCtx) =>
    set(() => ({ canvas, ctx, drawingCanvas, drawingCtx })),

  setActiveTool: (tool: Tool) => set(() => ({ activeTool: tool })),

  setStyle: (style) =>
    set((state) => ({ style: { ...state.style, ...style } })),

  addStrokePoint: (coordinate: Coordinate) =>
    set((state) => ({
      strokePoints: [...state.strokePoints, ...coordinate],
    })),
  commitSnapshot: () =>
    set((state) => {
      const newDrawing: Drawing = {
        id: crypto.randomUUID(),
        style: state.style,
        strokePoints: state.strokePoints,
        boundingBox: getBoundingBox([...state.strokePoints]),
      }

      const prevDrawings = state.index > -1 ? state.history[state.index] : []
      const newSnapshot = [...prevDrawings, newDrawing]
      const newHistory =
        state.index < state.history.length - 1
          ? [...state.history].slice(0, state.index + 1)
          : [...state.history]

      return {
        ...state,
        strokePoints: [],
        history: [...newHistory, newSnapshot],
        index: state.index + 1,
      }
    }),

  eraseDrawing: (drawingToDelete) =>
    set((state) => {
      const filteredDrawings = state.history[state.index].filter(
        (drawing) => drawing.id !== drawingToDelete.id
      )
      const newSnapshot = [...filteredDrawings]
      const newHistory =
        state.index < state.history.length - 1
          ? [...state.history].slice(0, state.index + 1)
          : [...state.history]
      return {
        ...state,
        history: [...newHistory, newSnapshot],
        index: state.index + 1,
      }
    }),

  undo: () => set((state) => ({ index: state.index - 1 })),

  redo: () => set((state) => ({ index: state.index + 1 })),

  reset: () => {
    set(initialState)
  },
}))

export default useCanvasStore
