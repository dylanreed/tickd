// ABOUTME: Component for deleting user account with confirmation dialog.
// ABOUTME: Requires typing confirmation text to prevent accidental deletion.

import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function DeleteAccountSection() {
  const { profile } = useProfile()
  const { signOut } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isHinged = profile?.theme !== 'unhinged'
  const confirmPhrase = 'delete my account'

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== confirmPhrase) {
      setError('Please type the confirmation phrase exactly')
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('delete-account', {
        body: { confirm: 'DELETE_MY_ACCOUNT' },
      })

      if (fnError) {
        setError(fnError.message)
        setDeleting(false)
        return
      }

      if (data?.error) {
        setError(data.error)
        setDeleting(false)
        return
      }

      // Account deleted successfully, sign out
      await signOut()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account')
      setDeleting(false)
    }
  }

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Danger Zone</h3>

        {!showConfirm ? (
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-charcoal">Delete Account</p>
                <p className="text-sm text-dusty-purple">
                  Permanently delete your account and all data
                </p>
              </div>
              <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 rounded-xl p-4 space-y-4">
            <div>
              <p className="font-medium text-charcoal">Are you sure?</p>
              <p className="text-sm text-dusty-purple mt-1">
                This will permanently delete your account, all tasks, and subscription.
                This action cannot be undone.
              </p>
            </div>

            <div>
              <label className="block text-sm text-charcoal mb-1">
                Type <strong>{confirmPhrase}</strong> to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={confirmPhrase}
                className="w-full px-4 py-2 rounded-md bg-white text-charcoal border border-red-300 focus:border-red-500 focus:outline-none"
                disabled={deleting}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false)
                  setConfirmText('')
                  setError(null)
                }}
                disabled={deleting}
                className="px-4 py-2 bg-gray-200 text-charcoal rounded-md font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting || confirmText.toLowerCase() !== confirmPhrase}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Unhinged mode
  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-red">THE NUCLEAR OPTION</h3>

      {!showConfirm ? (
        <div className="bg-clock-red/10 border-3 border-clock-red p-5 shadow-[4px_4px_0_0_#1c1917]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-clock-black">Delete Account</p>
              <p className="text-sm text-clock-black/60 font-mono">
                nuke everything · no takebacks · very dramatic
              </p>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-5 py-3 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-clock-red/10 border-3 border-clock-red p-5 shadow-[4px_4px_0_0_#1c1917] space-y-4">
          <div>
            <p className="font-bold text-clock-black text-lg">Wait, for real?</p>
            <p className="text-sm text-clock-black/60 font-mono mt-1">
              this deletes EVERYTHING · tasks, settings, our whole relationship · I'll pretend I never knew you
            </p>
          </div>

          <div>
            <label className="block text-sm text-clock-black/60 mb-1 font-mono">
              Type <strong className="text-clock-red">{confirmPhrase}</strong> to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={confirmPhrase}
              className="w-full px-4 py-3 bg-clock-parchment text-clock-black border-3 border-clock-black focus:border-clock-red focus:outline-none shadow-[2px_2px_0_0_#1c1917] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all"
              disabled={deleting}
            />
          </div>

          {error && <p className="text-clock-red text-sm font-mono">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowConfirm(false)
                setConfirmText('')
                setError(null)
              }}
              disabled={deleting}
              className="px-5 py-3 bg-clock-parchment text-clock-black font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
            >
              Never mind
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting || confirmText.toLowerCase() !== confirmPhrase}
              className="px-5 py-3 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Goodbye forever'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
