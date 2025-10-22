"use client"
import { useEffect, useState } from 'react'

type Props = {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

export default function Typewriter({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseMs = 1400,
}: Props) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timer: any
    const current = phrases[index % phrases.length]

    if (!deleting) {
      if (display.length < current.length) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed)
      } else {
        timer = setTimeout(() => setDeleting(true), pauseMs)
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), deletingSpeed)
      } else {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      }
    }
    return () => clearTimeout(timer)
  }, [display, deleting, index, phrases, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span aria-live="polite" className="align-baseline">
      {display}
      <span className="tw-caret ml-0.5 inline-block h-6 w-0.5 align-baseline bg-brand-400" />
    </span>
  )
}

