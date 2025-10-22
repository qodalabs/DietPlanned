"use client"
import { Dispatch, SetStateAction } from 'react'

export function MobileHamburger({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <button
      aria-label="Toggle navigation"
      className="grid place-items-center size-10 rounded-md border border-gray-200 hover:bg-gray-50"
      onClick={() => setOpen((v) => !v)}
    >
      <span className="sr-only">Toggle menu</span>
      <div className="space-y-1.5">
        <div className={`h-0.5 w-6 bg-gray-800 transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <div className={`h-0.5 w-6 bg-gray-800 transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`h-0.5 w-6 bg-gray-800 transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </div>
    </button>
  )
}

export default MobileHamburger

