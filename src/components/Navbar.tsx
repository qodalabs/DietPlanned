"use client"
import Link from 'next/link'
import { useState } from 'react'
import { MobileHamburger } from '@/components/MobileHamburger'
import { supabase } from '@/lib/supabase'

export function Navbar({ authed }: { authed?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-ink-800/70 border-b border-gray-800 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight flex items-center gap-1 group">
          <span className="text-white">Diet</span>
          <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Planned</span>
          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-brand-500 shadow-glow-orange group-hover:scale-110 transition-transform" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-brand-400">Home</Link>
          <Link href="/dashboard" className="hover:text-brand-400">Dashboard</Link>
          {!authed ? (
            <>
              <Link href="/login" className="hover:text-brand-400">Login</Link>
              <Link href="/register" className="px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700 glow-orange">Get Started</Link>
            </>
          ) : (
            <button className="px-3 py-1.5 rounded-md border border-gray-700 hover:bg-ink-700" onClick={async ()=>{
              await supabase.auth.signOut();
              window.location.href = '/'
            }}>Logout</button>
          )}
        </nav>
        <div className="md:hidden">
          <MobileHamburger open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-4 py-3 flex flex-col gap-3 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            {!authed ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-md bg-brand-600 text-white text-center glow-orange">Get Started</Link>
              </>
            ) : (
              <button className="px-3 py-1.5 rounded-md border border-gray-700" onClick={async ()=>{ await supabase.auth.signOut(); setOpen(false); window.location.href='/'}}>Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
