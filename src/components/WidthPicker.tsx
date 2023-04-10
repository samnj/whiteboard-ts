import * as ToggleGroup from '@radix-ui/react-toggle-group'
import useCanvasStore, { Style } from '../store'

export default function WidthPicker() {
  const [lineWidth, setStyle] = useCanvasStore((state) => [
    state.style.lineWidth,
    state.setStyle,
  ])

  return (
    <ToggleGroup.Root
      className='flex items-center justify-center gap-1'
      type='single'
      defaultValue='4'
      value={lineWidth}
      onValueChange={(value: Style['lineWidth']) => {
        if (value) setStyle({ lineWidth: value })
      }}
    >
      <ToggleGroup.Item
        className='flex h-7 w-9 cursor-pointer items-center justify-center rounded-lg data-[state=on]:bg-cyan-800'
        value='4'
      >
        <div className='h-1 w-5 cursor-pointer rounded-sm bg-gray-200' />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className='flex h-7 w-9 cursor-pointer items-center justify-center rounded-lg data-[state=on]:bg-cyan-800'
        value='8'
      >
        <div className='h-2 w-5 cursor-pointer rounded-sm bg-gray-200' />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className='flex h-7 w-9 cursor-pointer items-center justify-center rounded-lg data-[state=on]:bg-cyan-800'
        value='12'
      >
        <div className='h-3 w-5 cursor-pointer rounded-sm bg-gray-200' />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
