import * as Toolbar from '@radix-ui/react-toolbar'
import ActionTools from './ActionTools'
import DrawingTools from './DrawingTools'

export default function ToolsPanel() {
  return (
    <Toolbar.Root
      orientation='horizontal'
      className='absolute inset-x-0 z-20 mx-auto mt-2 flex w-fit items-center justify-center gap-2 rounded-lg bg-gray-800 px-2 py-1'
    >
      <DrawingTools />
      <ActionTools />
    </Toolbar.Root>
  )
}
