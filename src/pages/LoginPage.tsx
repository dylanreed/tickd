// ABOUTME: Login page with magic link authentication.
// ABOUTME: Users enter email to receive a login link.

import { useState, type FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Tick from '../components/Tick'

export default function LoginPage() {
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
      <div className="min-h-screen bg-lavender flex items-center justify-center p-4 font-body">
        <div className="bg-cloud rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-2xl font-bold text-charcoal mb-4">Check your email</h2>
          <p className="text-charcoal">
            We sent a magic link to <strong className="text-hot-pink">{email}</strong>
          </p>
          <p className="text-dusty-purple mt-2 text-sm">
            Click the link in the email to sign in. We promise it's real.
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
    <div className="min-h-screen bg-lavender flex items-center justify-center p-4 font-body">
      <div className="bg-cloud rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="font-pixel text-xl text-charcoal mb-2 leading-relaxed">LIARS TODO</h1>
        <p className="text-dusty-purple mb-6">Your friendly neighborhood gaslighter.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-6 py-4 rounded-full bg-white text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-hot-pink focus:outline-none mb-4"
          />

          {error && (
            <p className="text-coral text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-hot-pink text-cloud font-bold py-4 px-6 rounded-full hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Lie to me'}
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
