"use client"
import { Navbar } from '@/components/Navbar'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-ink-900 min-h-dvh text-white">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-300">Log in to view your dashboard.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} className="w-full px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 glow-orange">{loading ? 'Logging in…' : 'Log in'}</button>
        </form>
        <p className="mt-4 text-sm text-gray-300">No account? <a href="/register" className="text-brand-400 hover:underline">Create one</a>.</p>
      </div>
    </main>
  )
}
