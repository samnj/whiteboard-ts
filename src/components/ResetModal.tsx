import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import useCanvasStore from '../store'

export default function ResetModal() {
  const reset = useCanvasStore((state) => state.reset)
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Trash
          className='stroke-gray-200 hover:stroke-gray-400 active:stroke-cyan-800'
          size={20}
          strokeWidth={3}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='animate-in fade-in fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm transition-opacity' />
        <AlertDialog.Content className='animate-in fade-in-90 slide-in-from-bottom-10 fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-800 p-6'>
          <AlertDialog.Title className='text-lg font-semibold text-gray-200'>
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className='mt-2 text-sm text-gray-200'>
            This will reset the canvas and cannot be undone.
          </AlertDialog.Description>
          <div className='mt-4 flex items-center justify-end gap-4'>
            <AlertDialog.Action
              className='h-10 rounded-md bg-red-900 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-red-700 focus:outline-none focus:ring-2'
              onClick={() => reset()}
            >
              Clear
            </AlertDialog.Action>
            <AlertDialog.Cancel className='h-10 rounded-md border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2'>
              Cancel
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
