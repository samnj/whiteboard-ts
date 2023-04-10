import ColorPicker from './ColorPicker'
import WidthPicker from './WidthPicker'

export default function StylesPanel() {
  return (
    <div className='absolute z-20 ml-2 mt-2 flex cursor-default flex-col gap-4 rounded-lg bg-gray-800 p-2'>
      <ColorPicker />
      <WidthPicker />
    </div>
  )
}
