// ABOUTME: Form component for adding new tasks.
// ABOUTME: Collects title, due date, optional category and description.

import { useState, type FormEvent } from 'react'
import type { CreateTaskInput } from '../types/task'

interface AddTaskFormProps {
  onAdd: (task: CreateTaskInput) => Promise<{ error: Error | null }>
  theme: 'hinged' | 'unhinged'
}

export default function AddTaskForm({ onAdd, theme }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !dueDate) return

    setSubmitting(true)
    setError(null)

    const { error } = await onAdd({
      title: title.trim(),
      real_due_date: new Date(dueDate).toISOString(),
      category: category.trim(),
      description: description.trim(),
    })

    if (error) {
      setError(error.message)
    } else {
      setTitle('')
      setDueDate('')
      setCategory('')
      setDescription('')
    }
    setSubmitting(false)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const isHinged = theme === 'hinged'

  const inputClasses = isHinged
    ? 'w-full px-4 py-2 rounded-md bg-hinged-card text-hinged-text placeholder-hinged-text-secondary border border-hinged-border focus:border-hinged-accent focus:outline-none focus:ring-1 focus:ring-hinged-accent'
    : 'w-full px-4 py-3 rounded-xl bg-white text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-hot-pink focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className={`shadow-sm p-6 ${isHinged ? 'bg-hinged-card rounded-lg border border-hinged-border' : 'bg-cloud rounded-2xl'}`}>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={theme === 'unhinged' ? "What are you procrastinating on?" : "Task title"}
          required
          className={inputClasses}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="dueDate" className={`block text-sm mb-1 ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>
              Due date {theme === 'unhinged' && <span className="text-xs text-hot-pink">(we'll lie about this)</span>}
            </label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} min={minDate} required className={inputClasses} />
          </div>
          <div className="flex-1">
            <label htmlFor="category" className={`block text-sm mb-1 ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>Category (optional)</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="work, personal..." className={inputClasses} />
          </div>
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={2} className={`${inputClasses} resize-none`} />
        {error && <p className={`text-sm ${isHinged ? 'text-red-600' : 'text-coral'}`}>{error}</p>}
        <button type="submit" disabled={submitting || !title.trim() || !dueDate} className={`w-full font-bold py-3 px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isHinged
            ? 'bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover'
            : 'bg-hot-pink text-cloud rounded-full hover:bg-coral'
        }`}>
          {submitting ? 'Adding...' : theme === 'unhinged' ? 'Add Task (good luck)' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}
