// ABOUTME: Login page with magic link authentication.
// ABOUTME: Users enter email to receive a login link.

import { useState, type FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Tick from '../components/Tick'

interface LoginPageProps {
  onBack?: () => void
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = await signIn(email)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setSubmitting(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-clock-parchment flex items-center justify-center p-4 font-body">
        <div className="bg-clock-ivory border-3 border-clock-black shadow-[6px_6px_0_0_#1c1917] p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="font-pixel text-lg text-clock-black mb-4">CHECK YOUR EMAIL</h2>
          <p className="text-clock-black">
            We sent a magic link to <strong className="text-clock-red">{email}</strong>
          </p>
          <p className="text-clock-black/60 mt-2 text-sm font-mono">
            click the link to enter · trust issues officially begin
          </p>
        </div>
        <Tick
          totalTasks={0}
          completedTasks={0}
          overdueTasks={0}
          approachingTasks={0}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-clock-parchment flex items-center justify-center p-4 font-body">
      <div className="bg-clock-ivory border-3 border-clock-black shadow-[6px_6px_0_0_#1c1917] p-8 max-w-md w-full relative">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 text-clock-black/60 hover:text-clock-black transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="font-pixel text-xl text-clock-black mb-2 leading-relaxed">TICK'D</h1>
        <p className="text-clock-black/70 mb-6 font-mono text-sm">your friendly neighborhood gaslighter · enter at your own risk</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-6 py-4 bg-clock-parchment text-clock-black placeholder-clock-black/40 border-3 border-clock-black focus:border-clock-red focus:outline-none mb-4 shadow-[3px_3px_0_0_#1c1917] focus:shadow-[1px_1px_0_0_#1c1917] focus:translate-x-0.5 focus:translate-y-0.5 transition-all font-mono"
          />

          {error && (
            <p className="text-clock-red text-sm mb-4 font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-clock-red text-clock-ivory font-bold py-4 px-6 border-3 border-clock-black hover:bg-clock-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            {submitting ? 'INITIATING DECEPTION...' : 'LIE TO ME'}
          </button>
        </form>
      </div>
      <Tick
        totalTasks={0}
        completedTasks={0}
        overdueTasks={0}
        approachingTasks={0}
      />
    </div>
  )
}
