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

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={theme === 'unhinged' ? "What are you procrastinating on?" : "Task title"}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="dueDate" className="block text-sm text-gray-600 mb-1">
              Due date {theme === 'unhinged' && <span className="text-xs">(we'll lie about this)</span>}
            </label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} min={minDate} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm text-gray-600 mb-1">Category (optional)</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="work, personal..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={submitting || !title.trim() || !dueDate} className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? 'Adding...' : theme === 'unhinged' ? 'Add Task (good luck)' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}
