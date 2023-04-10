import * as ToggleGroup from '@radix-ui/react-toggle-group'
import useCanvasStore, { Style } from '../store'

import { Circle } from 'lucide-react'

export default function ColorPicker() {
  const [strokeStyle, setStyle] = useCanvasStore((state) => [
    state.style.strokeStyle,
    state.setStyle,
  ])

  return (
    <ToggleGroup.Root
      className='flex items-center justify-center gap-1'
      type='single'
      defaultValue='white'
      value={strokeStyle}
      onValueChange={(value: Style['strokeStyle']) => {
        if (value) setStyle({ strokeStyle: value })
      }}
    >
      <ToggleGroup.Item
        className='intems-center flex cursor-pointer justify-center rounded-lg p-2 data-[state=on]:bg-cyan-800'
        value='white'
      >
        <Circle className='fill-white text-white' size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className='intems-center flex cursor-pointer justify-center rounded-lg p-2 data-[state=on]:bg-cyan-800'
        value='red'
      >
        <Circle className='fill-red-600 text-red-600' size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className='intems-center flex cursor-pointer justify-center rounded-lg p-2 data-[state=on]:bg-cyan-800'
        value='blue'
      >
        <Circle className='fill-blue-600 text-blue-600' size={20} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
