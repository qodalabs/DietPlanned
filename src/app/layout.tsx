import './globals.css'
import type { Metadata } from 'next'
import SiteSplash from '@/components/SiteSplash'

export const metadata: Metadata = {
  title: 'DietPlanned — Personal Diet Planner',
  description: 'Humanized diet planning with assessments, BMI, and smart plans.',
  metadataBase: new URL('http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-dvh antialiased bg-ink-900 text-white">
        {/* Site-wide splash: shows ~10s on first load */}
        <SiteSplash durationMs={10000} />
        {children}
      </body>
    </html>
  )
}
