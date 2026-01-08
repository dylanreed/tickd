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
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center p-4 z-50 font-body">
      <div className="bg-cloud rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {theme === 'unhinged' && wasOnTime && <div className="text-6xl mb-4">🎉</div>}
        <h2 className="font-pixel text-lg text-charcoal mb-4">{theme === 'unhinged' ? 'THE REVEAL' : 'TASK COMPLETED'}</h2>
        <p className="text-xl font-bold text-charcoal mb-4">{taskTitle}</p>
        <div className="bg-lavender/50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-dusty-purple mb-1">Real due date was:</p>
          <p className="text-lg font-bold text-charcoal">{realDueDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <p className={`text-lg mb-6 font-medium ${wasOnTime ? 'text-charcoal' : 'text-coral'}`}>{message}</p>
        <button onClick={onClose} className="bg-hot-pink text-cloud font-bold px-8 py-3 rounded-full hover:bg-coral transition-colors">{theme === 'unhinged' ? 'Nice.' : 'Close'}</button>
      </div>
    </div>
  )
}
