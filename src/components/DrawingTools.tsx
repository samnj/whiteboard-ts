import * as Toolbar from '@radix-ui/react-toolbar'
import { Eraser, Edit2 as Pencil } from 'lucide-react'
import useCanvasStore, { Tool } from '../store'

export default function DrawingTools() {
  const [activeTool, setActiveTool] = useCanvasStore((state) => [
    state.activeTool,
    state.setActiveTool,
  ])

  return (
    <Toolbar.ToggleGroup
      defaultValue='pencil'
      className='flex items-center gap-2'
      type='single'
      value={activeTool}
      onValueChange={(value: Tool) => {
        if (value) setActiveTool(value)
      }}
    >
      <Toolbar.ToggleItem
        className='rounded-lg stroke-gray-200 p-2 data-[state=on]:bg-cyan-800 data-[state=off]:hover:stroke-gray-400'
        value='pencil'
      >
        <Pencil className='stroke-inherit' strokeWidth={3} size={20} />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className='rounded-lg stroke-gray-200 p-2 data-[state=on]:bg-cyan-800 data-[state=off]:hover:stroke-gray-400'
        value='eraser'
      >
        <Eraser className='stroke-inherit' strokeWidth={3} size={20} />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  )
}
