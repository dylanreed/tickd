// ABOUTME: Login page with magic link and OTP code authentication.
// ABOUTME: Auto-detects PWA vs browser to default to best auth method.

import { useState, useEffect, type FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Tick from '../components/Tick'

interface LoginPageProps {
  onBack?: () => void
}

type AuthStep = 'email' | 'magic-link-sent' | 'code-entry'

function isPWA(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const { signIn, signInWithCode, verifyCode } = useAuth()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<AuthStep>('email')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [defaultToCode, setDefaultToCode] = useState(false)

  useEffect(() => {
    setDefaultToCode(isPWA())
  }, [])

  const handleSendMagicLink = async () => {
    setSubmitting(true)
    setError(null)

    const { error } = await signIn(email)

    if (error) {
      setError(error.message)
    } else {
      setStep('magic-link-sent')
    }
    setSubmitting(false)
  }

  const handleSendCode = async () => {
    setSubmitting(true)
    setError(null)

    const { error } = await signInWithCode(email)

    if (error) {
      setError(error.message)
    } else {
      setStep('code-entry')
    }
    setSubmitting(false)
  }

  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault()
    if (defaultToCode) {
      await handleSendCode()
    } else {
      await handleSendMagicLink()
    }
  }

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = await verifyCode(email, code)

    if (error) {
      setError(error.message)
    }
    setSubmitting(false)
  }

  const handleCodeChange = async (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6)
    setCode(cleaned)

    if (cleaned.length === 6) {
      setSubmitting(true)
      setError(null)
      const { error } = await verifyCode(email, cleaned)
      if (error) {
        setError(error.message)
      }
      setSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    setSubmitting(true)
    setError(null)

    const { error } = await signInWithCode(email)

    if (error) {
      setError(error.message)
    } else {
      setError(null)
      setCode('')
    }
    setSubmitting(false)
  }

  if (step === 'magic-link-sent') {
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
          <button
            onClick={() => setStep('code-entry')}
            className="mt-6 text-clock-black/60 hover:text-clock-red text-sm font-mono transition-colors"
          >
            have a code? enter it here
          </button>
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

  if (step === 'code-entry') {
    return (
      <div className="min-h-screen bg-clock-parchment flex items-center justify-center p-4 font-body">
        <div className="bg-clock-ivory border-3 border-clock-black shadow-[6px_6px_0_0_#1c1917] p-8 max-w-md w-full relative">
          <button
            onClick={() => {
              setStep('email')
              setCode('')
              setError(null)
            }}
            className="absolute top-4 left-4 text-clock-black/60 hover:text-clock-black transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔢</div>
            <h2 className="font-pixel text-lg text-clock-black mb-2">ENTER YOUR CODE</h2>
            <p className="text-clock-black/70 text-sm font-mono">
              sent to <strong className="text-clock-red">{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full px-6 py-4 bg-clock-parchment text-clock-black placeholder-clock-black/40 border-3 border-clock-black focus:border-clock-red focus:outline-none mb-4 shadow-[3px_3px_0_0_#1c1917] focus:shadow-[1px_1px_0_0_#1c1917] focus:translate-x-0.5 focus:translate-y-0.5 transition-all font-mono text-center text-2xl tracking-[0.5em]"
              disabled={submitting}
              autoFocus
            />

            {error && (
              <p className="text-clock-red text-sm mb-4 font-mono text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || code.length !== 6}
              className="w-full bg-clock-red text-clock-ivory font-bold py-4 px-6 border-3 border-clock-black hover:bg-clock-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0_#1c1917] hover:shadow-[2px_2px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {submitting ? 'VERIFYING...' : 'VERIFY CODE'}
            </button>
          </form>

          <button
            onClick={handleResendCode}
            disabled={submitting}
            className="w-full mt-4 text-clock-black/60 hover:text-clock-red text-sm font-mono transition-colors disabled:opacity-50"
          >
            didn't get it? resend code
          </button>
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

        <form onSubmit={handleSubmitEmail}>
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

        <button
          onClick={defaultToCode ? handleSendMagicLink : handleSendCode}
          disabled={submitting || !email}
          className="w-full mt-4 text-clock-black/60 hover:text-clock-red text-sm font-mono transition-colors disabled:opacity-50"
        >
          {defaultToCode ? 'prefer a magic link?' : 'using the app? send a code instead'}
        </button>
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
