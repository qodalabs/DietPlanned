"use client"
import { Navbar } from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import { metaDescriptionHome } from '@/lib/copy'
import Footer from '@/components/Footer'
import { useState } from 'react'
import Typewriter from '@/components/Typewriter'

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 -z-10 accent-grid opacity-20" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="text-white">Eat better with </span>
            <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              <Typewriter
                phrases={[
                  'clarity, not confusion.',
                  'plans that fit your life.',
                  'fuel, not stress.',
                ]}
                typingSpeed={48}
                deletingSpeed={28}
                pauseMs={1300}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 max-w-2xl text-gray-300"
          >
            {metaDescriptionHome()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex gap-3"
          >
            <a href="/register" className="px-5 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700 glow-orange">Get started</a>
            <a href="/login" className="px-5 py-3 rounded-md border border-gray-700 hover:bg-ink-700">I have an account</a>
          </motion.div>
        </div>
      </section>
      <section className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-5 w-5 fill-brand-500"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <p className="text-sm text-gray-300">Rated 4.9/5 by health-minded folks like you</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: 'Smart Assessments', d: 'BMI, BMR, activity — thoughtfully summarized.' },
              { t: 'Actionable Plans', d: 'Daily meals with macros, swaps, and recipes.' },
              { t: 'Print & Share', d: 'Printer-friendly layout and social metadata.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                className="rounded-xl border border-gray-800 p-5 bg-ink-800/60 backdrop-blur"
              >
                <div className="text-white font-medium">{f.t}</div>
                <div className="text-sm text-gray-400 mt-1">{f.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            How DietPlanned works
          </motion.h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '1', t: 'Tell us about you', d: 'A quick assessment covers age, height, weight, activity, and goals.' },
              { n: '2', t: 'Get your targets', d: 'We calculate BMI, BMR and daily calories — explained in plain language.' },
              { n: '3', t: 'Follow a plan', d: 'A 7‑day plan with meals, macros, swaps and a print‑friendly view.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-2xl border border-gray-800 bg-ink-800/60 p-6 backdrop-blur"
              >
                <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-brand-600/20 blur-2xl" />
                <div className="text-5xl font-extrabold text-brand-500/90">{s.n}</div>
                <div className="mt-3 text-lg font-semibold text-white">{s.t}</div>
                <div className="mt-1 text-sm text-gray-400">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold">Loved by busy humans</motion.h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: 'Meals that make sense for my day. I finally stopped second‑guessing.', a: '— Arooba S.' },
              { q: 'The assessment and plan summary are refreshingly clear and kind.', a: '— Haris K.' },
              { q: 'Print view + swaps are clutch. No more doom‑scroll recipes.', a: '— Nimra R.' },
            ].map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-gray-800 bg-ink-800/60 p-6 shadow-glow-orange/20"
              >
                <p className="text-gray-200">“{t.q}”</p>
                <footer className="mt-3 text-sm text-gray-400">{t.a}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA band */}
      <section className="relative bg-ink-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl border border-gray-800 bg-gradient-to-r from-ink-800/90 to-ink-700/60 p-8 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold">Ready for friendlier nutrition?</div>
              <div className="text-sm text-gray-400">Start with a quick assessment — it takes under a minute.</div>
            </div>
            <div className="flex gap-3">
              <a href="/register" className="px-5 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700 glow-orange">Get started</a>
              <a href="/dashboard/assessment" className="px-5 py-3 rounded-md border border-gray-700 hover:bg-ink-700">Try assessment</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ (accordion) */}
      <FAQSection />
      <Footer />
    </main>
  )
}

function FAQSection() {
  const items = [
    { q: 'Will I get exact calories and macros?', a: 'Yes. Each plan includes daily calories and macro targets with easy swaps to stay on track.' },
    { q: 'Can I print or share my plan?', a: 'Absolutely. There is a print‑friendly layout and we include social metadata for sharing.' },
    { q: 'Do you support vegetarian or halal options?', a: 'We include substitutions for common preferences. A dedicated selector is coming soon.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">FAQs</h2>
        <div className="mt-6 space-y-3">
          {items.map((it, i) => (
            <motion.div key={i} layout className="rounded-xl border border-gray-800 bg-ink-800/60 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                <span className="font-medium text-white">{it.q}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-brand-400"
                >
                  ▾
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="px-5 pb-5 -mt-2 text-sm text-gray-300"
                  >
                    {it.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
