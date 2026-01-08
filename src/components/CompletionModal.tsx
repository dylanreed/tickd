// ABOUTME: Modal showing the reveal when a task is completed.
// ABOUTME: Displays real due date and how early/late the task was finished.

interface CompletionModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
  theme: 'hinged' | 'unhinged'
}

export default function CompletionModal({ isOpen, onClose, taskTitle, realDueDate, completedAt, wasOnTime, theme }: CompletionModalProps) {
  if (!isOpen) return null

  const diffMs = realDueDate.getTime() - completedAt.getTime()
  const diffDays = Math.abs(Math.round(diffMs / (1000 * 60 * 60 * 24)))
  const diffHours = Math.abs(Math.round(diffMs / (1000 * 60 * 60)))

  const timeText = diffDays > 0 ? `${diffDays} day${diffDays === 1 ? '' : 's'}` : `${diffHours} hour${diffHours === 1 ? '' : 's'}`

  const hingedMessages = {
    early: `Nice work. You finished ${timeText} ahead of schedule.`,
    onTime: 'Completed right on time.',
    late: `Completed ${timeText} late, but it's done now.`,
  }

  const unhingedMessages = {
    early: `OH THANK GOD. You actually did it. ${timeText} early. I'm genuinely shocked.`,
    onTime: `You finished EXACTLY on time. The universe aligned. What are the odds.`,
    late: `${timeText} late. But hey, you're here now. We don't judge. (We judge a little.)`,
  }

  const messages = theme === 'unhinged' ? unhingedMessages : hingedMessages
  const message = wasOnTime ? (diffDays > 0 || diffHours > 0 ? messages.early : messages.onTime) : messages.late

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        {theme === 'unhinged' && wasOnTime && <div className="text-6xl mb-4">🎉</div>}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{theme === 'unhinged' ? 'THE REVEAL' : 'Task Completed'}</h2>
        <p className="text-lg font-medium text-gray-800 mb-4">{taskTitle}</p>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Real due date was:</p>
          <p className="text-lg font-semibold text-gray-900">{realDueDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <p className={`text-lg mb-6 ${wasOnTime ? 'text-green-600' : 'text-amber-600'}`}>{message}</p>
        <button onClick={onClose} className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800">{theme === 'unhinged' ? 'Nice.' : 'Close'}</button>
      </div>
    </div>
  )
}
