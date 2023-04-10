import * as Toolbar from '@radix-ui/react-toolbar'
import { Redo2, Undo2 } from 'lucide-react'
import useCanvasStore from '../store'
import ResetModal from './ResetModal'

export default function ActionTools() {
  const [index, history, undo, redo] = useCanvasStore((state) => [
    state.index,
    state.history,
    state.undo,
    state.redo,
  ])

  function handleUndo() {
    if (index === -1) return
    undo()
  }

  function handleRedo() {
    if (index === history.length - 1) return
    redo()
  }

  return (
    <>
      <Toolbar.Button
        className='p-2 active:stroke-cyan-800'
        onClick={handleUndo}
      >
        <Undo2
          className='stroke-gray-200 hover:stroke-gray-400 active:stroke-cyan-800'
          size={20}
          strokeWidth={3}
        />
      </Toolbar.Button>
      <Toolbar.Button
        className='p-2 active:stroke-cyan-800'
        onClick={handleRedo}
      >
        <Redo2
          className='stroke-gray-200 hover:stroke-gray-400 active:stroke-cyan-800'
          size={20}
          strokeWidth={3}
        />
      </Toolbar.Button>
      <Toolbar.Button className='p-2 active:stroke-cyan-800'>
        <ResetModal />
      </Toolbar.Button>
    </>
  )
}
