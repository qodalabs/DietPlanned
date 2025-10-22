export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-ink-800/60 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-white">Diet<span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Planned</span></div>
          <p className="mt-2 text-sm text-gray-400">Humanized diet planning that fits your day, not the other way around.</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Product</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="hover:text-brand-400" href="/dashboard">Dashboard</a></li>
            <li><a className="hover:text-brand-400" href="/dashboard/assessment">Assessment</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="hover:text-brand-400" href="#">Privacy</a></li>
            <li><a className="hover:text-brand-400" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-gray-500">© {new Date().getFullYear()} DietPlanned. All rights reserved.</div>
      </div>
    </footer>
  )
}

