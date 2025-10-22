"use client"
import React, { useState } from 'react'

type Sex = 'male' | 'female'

export function AssessmentForm({ onComplete }: { onComplete?: (result: any) => void }) {
  const [form, setForm] = useState({
    age: '',
    sex: 'male' as Sex,
    heightCm: '',
    weightKg: '',
    activity: 'sedentary',
    goal: 'maintain',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Assessment failed')
      onComplete?.(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input required type="number" min={10} max={100} value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Sex</label>
          <select value={form.sex} onChange={e => setForm({ ...form, sex: e.target.value as Sex })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Activity</label>
          <select value={form.activity} onChange={e => setForm({ ...form, activity: e.target.value })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Height (cm)</label>
          <input required type="number" min={100} max={250} value={form.heightCm} onChange={e => setForm({ ...form, heightCm: e.target.value })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input required type="number" min={30} max={250} value={form.weightKg} onChange={e => setForm({ ...form, weightKg: e.target.value })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Goal</label>
          <select value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} className="mt-1 w-full rounded-md border border-gray-700 bg-ink-800/60 text-white px-3 py-2">
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Gain muscle</option>
          </select>
        </div>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button disabled={loading} className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 glow-orange">
        {loading ? 'Assessing…' : 'Run Assessment'}
      </button>
    </form>
  )
}

export default AssessmentForm
