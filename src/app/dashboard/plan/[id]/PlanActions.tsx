"use client"
import React from 'react'

export default function PlanActions() {
  return (
    <div className="mt-8 flex gap-3 print:hidden">
      <button onClick={() => window.print()} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Print</button>
      <button onClick={() => (window.location.href = '/dashboard/assessment')} className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Swap meals</button>
    </div>
  )
}

