// ABOUTME: Main page displaying the task list with add form.
// ABOUTME: Orchestrates task management and completion reveals.

import { useState, useEffect } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useProfile } from '../hooks/useProfile'
import { useExcuses } from '../hooks/useExcuses'
import { useSubscription } from '../hooks/useSubscription'
import { usePickForMe } from '../hooks/usePickForMe'
import { useDailyCheckin } from '../hooks/useDailyCheckin'
import { useTransitionHelp } from '../hooks/useTransitionHelp'
import { useFiveMinutes } from '../hooks/useFiveMinutes'
import { useBodyDoubling } from '../hooks/useBodyDoubling'
import { useMomentumBuilder } from '../hooks/useMomentumBuilder'
import { useTaskShrinking } from '../hooks/useTaskShrinking'
import { useAuth } from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import CompletionModal from '../components/CompletionModal'
import ExcuseModal from '../components/ExcuseModal'
import ThemeToggle from '../components/ThemeToggle'
import Tick from '../components/Tick'
import SpicinessModal from '../components/SpicinessModal'
import SubscriptionLockOverlay from '../components/SubscriptionLockOverlay'
import PickForMeButton from '../components/PickForMeButton'
import EscalationModal from '../components/EscalationModal'
import SingleTaskMode from '../components/SingleTaskMode'
import DailyCheckinModal from '../components/DailyCheckinModal'
import TransitionPrompt from '../components/TransitionPrompt'
import RitualWalkthrough from '../components/RitualWalkthrough'
import CountdownTimer from '../components/CountdownTimer'
import FiveMinutesTimer from '../components/FiveMinutesTimer'
import ShrinkTaskModal from '../components/ShrinkTaskModal'
import MicroStepView from '../components/MicroStepView'
import BodyDoublingStart from '../components/BodyDoublingStart'
import BodyDoublingSession from '../components/BodyDoublingSession'
import WarmupOffer from '../components/WarmupOffer'
import WarmupQueue from '../components/WarmupQueue'
import type { SpicyLevel } from '../data/pickForMeMessages'

const SPICY_LEVEL_KEY = 'tickd-spicy-level'

interface CompletionData {
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
  estimatedMinutes: number | null
  actualMinutes: number | null
}

export default function TaskListPage() {
  const { user, signOut } = useAuth()
  const { profile, updateProfile, adjustReliabilityScore } = useProfile()
  const { tasks, addTask, completeTask, deleteTask, loading } = useTasks()
  const { makeExcuse } = useExcuses()
  const { isLocked, status: subscriptionStatus } = useSubscription()
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)
  const [justCompleted, setJustCompleted] = useState(false)
  const [justRevealed, setJustRevealed] = useState(false)
  const [spicinessModalOpen, setSpicinessModalOpen] = useState(false)
  const [spicyLevel, setSpicyLevel] = useState(3)
  const [excuseTaskId, setExcuseTaskId] = useState<string | null>(null)
  const [escalationModalOpen, setEscalationModalOpen] = useState(false)

  // Pick For Me hook - respect profile settings (default to true for backwards compatibility)
  const pickForMe = usePickForMe(
    tasks,
    profile?.reliability_score ?? 50,
    user?.id ?? null,
    profile?.pick_for_me_enabled ?? true,
    profile?.single_task_escalation_enabled ?? true
  )

  // Feature hooks - respect profile settings
  const dailyCheckin = useDailyCheckin()
  const transitionHelp = useTransitionHelp()
  const fiveMinutes = useFiveMinutes()
  const bodyDoubling = useBodyDoubling()
  const momentumBuilder = useMomentumBuilder()
  const taskShrinking = useTaskShrinking()

  // Track transition help state
  const [showTransitionPrompt, setShowTransitionPrompt] = useState(false)
  const [showRitualWalkthrough, setShowRitualWalkthrough] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [showBodyDoublingStart, setShowBodyDoublingStart] = useState(false)
  const [showWarmupOffer, setShowWarmupOffer] = useState(false)
  const [warmupTargetTaskId, setWarmupTargetTaskId] = useState<string | null>(null)
  const [shrinkingTaskId, setShrinkingTaskId] = useState<string | null>(null)

  // Load spicy level - migrate from localStorage to DB if needed
  useEffect(() => {
    if (user && profile) {
      const localKey = `${SPICY_LEVEL_KEY}-${user.id}`
      const localValue = localStorage.getItem(localKey)

      if (localValue && profile.spicy_level === 3) {
        // Migrate localStorage value to database
        const level = Number(localValue)
        if (level >= 1 && level <= 5) {
          updateProfile({ spicy_level: level })
          setSpicyLevel(level)
        }
        localStorage.removeItem(localKey)
      } else {
        // Use database value (default to 3 if not set)
        setSpicyLevel(profile.spicy_level ?? 3)
      }
    }
  }, [user, profile, updateProfile])

  const handleSpicySave = async (level: number) => {
    setSpicyLevel(level)
    await updateProfile({ spicy_level: level })
  }

  const excuseTask = tasks.find(t => t.id === excuseTaskId)

  const handleExcuse = (taskId: string) => {
    setExcuseTaskId(taskId)
  }

  const handleExcuseSubmit = async (excuse: string) => {
    if (!excuseTaskId) return { success: false, error: 'No task selected' }
    const result = await makeExcuse(excuseTaskId, excuse)
    if (result.success) {
      setExcuseTaskId(null)
    }
    return result
  }

  const theme = profile?.theme ?? 'hinged'
  const pendingTasks = tasks.filter(t => t.status === 'pending')
  const completedTasks = tasks.filter(t => t.status === 'completed')
  const overdueTasks = pendingTasks.filter(t => t.urgency === 'overdue')
  const approachingTasks = pendingTasks.filter(t => t.urgency === 'critical' || t.urgency === 'high')

  // Reset just completed state after a few seconds
  useEffect(() => {
    if (justCompleted) {
      const timer = setTimeout(() => setJustCompleted(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [justCompleted])

  // Reset just revealed state after a few seconds
  useEffect(() => {
    if (justRevealed) {
      const timer = setTimeout(() => setJustRevealed(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [justRevealed])

  // Check for transition help triggers (browsing without starting)
  useEffect(() => {
    if (profile?.transition_prompts_enabled && transitionHelp.shouldOfferTransition()) {
      setShowTransitionPrompt(true)
    }
  }, [profile?.transition_prompts_enabled, transitionHelp])

  // Track page views for transition help
  useEffect(() => {
    if (profile?.transition_prompts_enabled && !loading) {
      transitionHelp.recordListView()
    }
  }, [profile?.transition_prompts_enabled, loading, transitionHelp])

  // Transition help flow handlers
  const handleTransitionStartFull = () => {
    setShowTransitionPrompt(false)
    transitionHelp.startTransition()
    transitionHelp.goToRitual()
    setShowRitualWalkthrough(true)
  }

  const handleTransitionQuickStart = () => {
    setShowTransitionPrompt(false)
    transitionHelp.goToCountdown()
    setShowCountdown(true)
  }

  const handleTransitionDismiss = () => {
    setShowTransitionPrompt(false)
    transitionHelp.cancel()
  }

  const handleRitualComplete = () => {
    setShowRitualWalkthrough(false)
    transitionHelp.goToCountdown()
    setShowCountdown(true)
  }

  const handleRitualSkip = () => {
    setShowRitualWalkthrough(false)
    transitionHelp.skipRitual()
    setShowCountdown(true)
  }

  const handleCountdownComplete = () => {
    setShowCountdown(false)
    transitionHelp.completeCountdown()
  }

  // Five minutes handlers
  const handleStartFiveMinutes = (taskId: string) => {
    fiveMinutes.start(taskId)
    transitionHelp.recordTaskStarted()
  }

  const handleFiveMinutesPause = () => {
    fiveMinutes.pause()
  }

  const handleFiveMinutesResume = () => {
    fiveMinutes.resume()
  }

  const handleFiveMinutesStop = () => {
    fiveMinutes.stop('clean_exit')
  }

  // Called when user completes task during 5-minute session
  const _handleFiveMinutesComplete = async () => {
    if (fiveMinutes.state.taskId) {
      await handleComplete(fiveMinutes.state.taskId)
    }
    fiveMinutes.stop('completed')
  }
  void _handleFiveMinutesComplete // Mark as intentionally unused for now

  // Task shrinking handlers
  const handleStartShrinking = (taskId: string) => {
    setShrinkingTaskId(taskId)
  }

  const handleAddMicroStep = (stepText: string) => {
    if (shrinkingTaskId) {
      taskShrinking.addMicroStep(shrinkingTaskId, stepText)
    }
  }

  const handleCompleteMicroStep = () => {
    if (shrinkingTaskId) {
      taskShrinking.completeCurrentStep(shrinkingTaskId)
    }
  }

  const handleShrinkingClose = () => {
    if (shrinkingTaskId) {
      taskShrinking.clearMicroSteps(shrinkingTaskId)
    }
    setShrinkingTaskId(null)
  }

  // Called when user finishes task through micro-steps
  const _handleShrinkingDone = async () => {
    if (shrinkingTaskId) {
      await handleComplete(shrinkingTaskId)
      taskShrinking.clearMicroSteps(shrinkingTaskId)
      setShrinkingTaskId(null)
    }
  }
  void _handleShrinkingDone // Mark as intentionally unused for now

  // Body doubling handlers
  const handleOpenBodyDoublingStart = () => {
    setShowBodyDoublingStart(true)
  }

  const handleStartBodyDoubling = (intensity?: 'passive' | 'checkins' | 'activity_aware' | 'coworking') => {
    bodyDoubling.startSession(intensity ?? profile?.body_doubling_intensity ?? 'coworking')
    setShowBodyDoublingStart(false)
    transitionHelp.recordTaskStarted()
  }

  // Reserved for manual pause functionality
  const _handleBodyDoublingPause = () => {
    // Body doubling tracks activity automatically, but we can touch the current task
    if (bodyDoubling.state.session?.tasksTouched[0]) {
      bodyDoubling.touchTask(bodyDoubling.state.session.tasksTouched[0])
    }
  }
  void _handleBodyDoublingPause // Mark as intentionally unused for now

  const handleBodyDoublingDismissCheckin = () => {
    bodyDoubling.dismissCheckin()
  }

  // Reserved for ending session from controls
  const _handleBodyDoublingEnd = () => {
    bodyDoubling.endSession()
  }
  void _handleBodyDoublingEnd // Mark as intentionally unused for now

  // Momentum builder handlers
  const handleOfferWarmup = (targetTaskId: string) => {
    setWarmupTargetTaskId(targetTaskId)
    setShowWarmupOffer(true)
  }

  const handleStartWarmup = () => {
    if (warmupTargetTaskId) {
      momentumBuilder.startWarmup(
        warmupTargetTaskId,
        pendingTasks,
        profile?.warmup_streak_size ?? 3
      )
      setShowWarmupOffer(false)
    }
  }

  const handleWarmupTaskComplete = async (taskId: string) => {
    await handleComplete(taskId)
    momentumBuilder.completeWarmupTask(taskId)
  }

  const handleSkipWarmup = () => {
    momentumBuilder.skipToTarget()
    setShowWarmupOffer(false)
  }

  const handleCancelWarmup = () => {
    momentumBuilder.cancel()
    setShowWarmupOffer(false)
    setWarmupTargetTaskId(null)
  }

  const handleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    setJustCompleted(true)
    const { wasOnTime, realDueDate, completedAt } = await completeTask(taskId)

    if (wasOnTime !== undefined && realDueDate) {
      // Calculate actual minutes if task was being tracked
      // For now, we'll use the task's actual_minutes field if set
      // In the future, this could come from useTaskEstimation
      const actualMinutes = task.actual_minutes

      setCompletionData({
        taskTitle: task.title,
        realDueDate,
        completedAt: completedAt ?? new Date(),
        wasOnTime,
        estimatedMinutes: task.estimated_minutes,
        actualMinutes,
      })
      await adjustReliabilityScore(wasOnTime)
    }
  }

  const handleModalClose = () => {
    setCompletionData(null)
    setJustRevealed(true)
  }

  // Pick For Me handlers
  const handlePickForMe = () => {
    const wasInSingleTaskMode = pickForMe.state.inSingleTaskMode
    pickForMe.pickTask()
    // Check if we just entered single-task mode (escalation triggered)
    if (!wasInSingleTaskMode && pickForMe.state.pickCount >= 1) {
      // The hook will update state, check on next render if we entered single-task mode
      setTimeout(() => {
        if (pickForMe.state.inSingleTaskMode) {
          setEscalationModalOpen(true)
        }
      }, 0)
    }
  }

  // Effect to detect escalation
  useEffect(() => {
    if (pickForMe.state.inSingleTaskMode && pickForMe.state.tasksCompleted === 0) {
      // Just entered single-task mode
      setEscalationModalOpen(true)
    }
  }, [pickForMe.state.inSingleTaskMode, pickForMe.state.tasksCompleted])

  const handleSingleTaskComplete = async () => {
    const currentTask = pickForMe.currentTask
    if (!currentTask) return

    // Complete the task normally
    await handleComplete(currentTask.id)

    // Then notify Pick For Me
    pickForMe.completePick()
  }

  const handleSingleTaskDismiss = () => {
    pickForMe.dismissPick()
  }

  // Extract first name from email for Tick
  const userName = user?.email?.split('@')[0] ?? undefined

  const handleThemeToggle = async (newTheme: 'hinged' | 'unhinged') => {
    await updateProfile({ theme: newTheme })
  }

  const isHinged = theme === 'hinged'

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-body ${isHinged ? 'bg-hinged-bg' : 'bg-lavender'}`}>
        <div className={isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}>
          {isHinged ? 'Loading...' : 'Loading your lies...'}
        </div>
      </div>
    )
  }

  // Render Single Task Mode if active
  if (pickForMe.state.inSingleTaskMode && pickForMe.currentTask && !escalationModalOpen) {
    return (
      <>
        <SingleTaskMode
          task={pickForMe.currentTask}
          tasksRemaining={pickForMe.state.tasksToComplete - pickForMe.state.tasksCompleted}
          totalRequired={pickForMe.state.tasksToComplete}
          tasksCompleted={pickForMe.state.tasksCompleted}
          onComplete={handleSingleTaskComplete}
          onDismiss={handleSingleTaskDismiss}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
          userName={userName}
          totalTasks={tasks.length}
          overdueTasks={overdueTasks.length}
          showProgress={profile?.show_earnout_progress ?? true}
        />
        <CompletionModal
          isOpen={!!completionData}
          onClose={handleModalClose}
          taskTitle={completionData?.taskTitle ?? ''}
          realDueDate={completionData?.realDueDate ?? new Date()}
          completedAt={completionData?.completedAt ?? new Date()}
          wasOnTime={completionData?.wasOnTime ?? true}
          theme={theme}
          estimatedMinutes={completionData?.estimatedMinutes}
          actualMinutes={completionData?.actualMinutes}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      </>
    )
  }

  return (
    <div className={`min-h-screen font-body ${isHinged ? 'bg-hinged-bg' : 'bg-lavender'}`}>
      <header className={`shadow-sm sticky top-0 z-10 ${isHinged ? 'bg-hinged-card border-b border-hinged-border' : 'bg-cloud'}`}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className={isHinged ? 'font-medium text-hinged-text' : 'font-pixel text-sm text-charcoal'}>
              {theme === 'unhinged' ? "TICK'D 🤥" : "Tick'd"}
            </h1>
            <p className={`text-xs ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              onClick={() => (window.location.hash = 'settings')}
              aria-label="Settings"
              className={`p-2 rounded-lg transition-colors ${
                isHinged
                  ? 'text-hinged-text-secondary hover:text-hinged-text hover:bg-hinged-border'
                  : 'text-dusty-purple hover:text-hot-pink hover:bg-lavender'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={signOut}
              className={`text-sm transition-colors ${
                isHinged
                  ? 'text-hinged-text-secondary hover:text-hinged-text'
                  : 'text-dusty-purple hover:text-hot-pink'
              }`}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <AddTaskForm
          onAdd={addTask}
          theme={theme}
          showEstimation={profile?.estimation_prompts_enabled ?? false}
        />

        {pendingTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className={isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}>
              {theme === 'unhinged'
                ? "No tasks? Suspicious. What are you hiding?"
                : "No tasks yet. Add one above."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={deleteTask}
                onExcuse={handleExcuse}
                onFiveMinutes={handleStartFiveMinutes}
                onShrink={handleStartShrinking}
                onWarmup={handleOfferWarmup}
                theme={theme}
                isHighlighted={pickForMe.state.pickedTaskId === task.id}
                isDimmed={pickForMe.state.pickedTaskId !== null && pickForMe.state.pickedTaskId !== task.id}
                showFiveMinutes={profile?.just_five_minutes_enabled ?? false}
                showShrink={profile?.task_shrinking_enabled ?? false}
                showWarmup={profile?.momentum_builder_enabled ?? false}
              />
            ))}
          </div>
        )}

        {profile && (
          <div className={`text-center text-sm ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>
            Reliability score: <span className={`font-bold ${isHinged ? 'text-hinged-text' : 'text-charcoal'}`}>{profile.reliability_score}%</span>
            {theme === 'unhinged' && profile.reliability_score < 50 && (
              <span className="ml-2 text-hot-pink">(yikes)</span>
            )}
          </div>
        )}
      </main>

      <CompletionModal
        isOpen={!!completionData}
        onClose={handleModalClose}
        taskTitle={completionData?.taskTitle ?? ''}
        realDueDate={completionData?.realDueDate ?? new Date()}
        completedAt={completionData?.completedAt ?? new Date()}
        wasOnTime={completionData?.wasOnTime ?? true}
        theme={theme}
        estimatedMinutes={completionData?.estimatedMinutes}
        actualMinutes={completionData?.actualMinutes}
        spicyLevel={spicyLevel as SpicyLevel}
      />

      <Tick
        totalTasks={tasks.length}
        completedTasks={completedTasks.length}
        overdueTasks={overdueTasks.length}
        approachingTasks={approachingTasks.length}
        spicyLevel={spicyLevel}
        justCompleted={justCompleted}
        justRevealed={justRevealed}
        userName={userName}
        onLongPress={() => setSpicinessModalOpen(true)}
      />

      <SpicinessModal
        isOpen={spicinessModalOpen}
        onClose={() => setSpicinessModalOpen(false)}
        currentLevel={spicyLevel}
        onSave={handleSpicySave}
      />

      <ExcuseModal
        isOpen={!!excuseTaskId}
        onClose={() => setExcuseTaskId(null)}
        onSubmit={handleExcuseSubmit}
        taskTitle={excuseTask?.title || 'Unknown Task'}
      />

      {isLocked && (subscriptionStatus === 'expired' || subscriptionStatus === 'canceled') && (
        <SubscriptionLockOverlay status={subscriptionStatus} />
      )}

      {/* Pick For Me Button */}
      {pickForMe.canUsePick && (
        <PickForMeButton
          onPick={handlePickForMe}
          isFirstPick={pickForMe.state.pickCount === 0}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
          allOverdue={pickForMe.allOverdue}
        />
      )}

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={escalationModalOpen}
        onConfirm={() => setEscalationModalOpen(false)}
        theme={theme}
        spicyLevel={spicyLevel as SpicyLevel}
        tasksRequired={pickForMe.state.tasksToComplete}
        userName={userName}
      />

      {/* Daily Check-in Modal - blocks everything, shown once per day */}
      {profile?.daily_checkin_enabled && (
        <DailyCheckinModal
          isOpen={dailyCheckin.needsCheckin}
          onClose={() => {/* Can't close without selecting */}}
          onSelect={dailyCheckin.setBrainState}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      )}

      {/* Transition Prompt - helps with context switching */}
      <TransitionPrompt
        isOpen={showTransitionPrompt}
        spicyLevel={spicyLevel as SpicyLevel}
        theme={theme}
        hasRitual={(profile?.startup_ritual?.length ?? 0) > 0}
        onStartFull={handleTransitionStartFull}
        onQuickStart={handleTransitionQuickStart}
        onDismiss={handleTransitionDismiss}
      />

      {/* Ritual Walkthrough - guided startup ritual */}
      <RitualWalkthrough
        isOpen={showRitualWalkthrough}
        steps={profile?.startup_ritual ?? []}
        currentStep={transitionHelp.state.currentRitualStep}
        onCompleteStep={() => {
          // Check if this is the last step
          const steps = profile?.startup_ritual ?? []
          if (transitionHelp.state.currentRitualStep >= steps.length - 1) {
            handleRitualComplete()
          } else {
            transitionHelp.completeRitualStep()
          }
        }}
        onSkip={handleRitualSkip}
        theme={theme}
        spicyLevel={spicyLevel as SpicyLevel}
      />

      {/* Countdown Timer - final countdown before work */}
      <CountdownTimer
        isOpen={showCountdown}
        seconds={profile?.countdown_length ?? 10}
        theme={theme}
        onComplete={handleCountdownComplete}
        onCancel={() => {
          setShowCountdown(false)
          transitionHelp.cancel()
        }}
      />

      {/* Five Minutes Timer - active "just 5 minutes" session */}
      {fiveMinutes.state.isActive && (
        <div className="fixed bottom-24 right-4 z-40">
          <FiveMinutesTimer
            elapsedMs={fiveMinutes.state.elapsedMs}
            phase={fiveMinutes.state.phase}
            isPaused={fiveMinutes.state.isPaused}
            taskTitle={tasks.find(t => t.id === fiveMinutes.state.taskId)?.title ?? 'Task'}
            theme={theme}
            onPause={handleFiveMinutesPause}
            onResume={handleFiveMinutesResume}
            onStop={handleFiveMinutesStop}
          />
        </div>
      )}

      {/* Shrink Task Modal - enter micro steps */}
      <ShrinkTaskModal
        isOpen={!!shrinkingTaskId && taskShrinking.getMicroSteps(shrinkingTaskId ?? '').length === 0}
        onClose={handleShrinkingClose}
        taskTitle={tasks.find(t => t.id === shrinkingTaskId)?.title ?? ''}
        onSubmit={handleAddMicroStep}
        theme={theme}
        spicyLevel={spicyLevel as SpicyLevel}
      />

      {/* Micro Step View - working through micro steps */}
      {shrinkingTaskId && taskShrinking.getMicroSteps(shrinkingTaskId).length > 0 && (
        <MicroStepView
          taskTitle={tasks.find(t => t.id === shrinkingTaskId)?.title ?? ''}
          microSteps={taskShrinking.getMicroSteps(shrinkingTaskId)}
          currentStepIndex={taskShrinking.getCurrentStepIndex(shrinkingTaskId)}
          onCompleteStep={handleCompleteMicroStep}
          onAddStep={() => {
            // Clear current steps so modal reopens
            if (shrinkingTaskId) {
              taskShrinking.clearMicroSteps(shrinkingTaskId)
            }
          }}
          onHasMomentum={() => taskShrinking.setHasMomentum(shrinkingTaskId)}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      )}

      {/* Body Doubling Start Modal */}
      <BodyDoublingStart
        isOpen={showBodyDoublingStart}
        spicyLevel={spicyLevel as SpicyLevel}
        theme={theme}
        onStart={handleStartBodyDoubling}
        onClose={() => setShowBodyDoublingStart(false)}
      />

      {/* Body Doubling Session - active co-working overlay */}
      {bodyDoubling.state.isActive && (
        <BodyDoublingSession
          isActive={bodyDoubling.state.isActive}
          intensity={bodyDoubling.state.intensity}
          isPaused={false}
          showCheckin={bodyDoubling.state.showCheckin}
          durationSeconds={bodyDoubling.getSessionDurationSeconds()}
          onDismissCheckin={handleBodyDoublingDismissCheckin}
          onEndSession={bodyDoubling.endSession}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      )}

      {/* Warmup Offer Modal */}
      {warmupTargetTaskId && (
        <WarmupOffer
          isOpen={showWarmupOffer}
          taskTitle={tasks.find(t => t.id === warmupTargetTaskId)?.title ?? ''}
          quickWinCount={Math.min(profile?.warmup_streak_size ?? 3, pendingTasks.filter(t => t.id !== warmupTargetTaskId).length)}
          streakSize={profile?.warmup_streak_size ?? 3}
          onAccept={handleStartWarmup}
          onDecline={handleSkipWarmup}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      )}

      {/* Warmup Queue - active momentum building */}
      {momentumBuilder.state.isActive && (
        <WarmupQueue
          warmupTasks={pendingTasks.filter(t => momentumBuilder.warmupTaskIds.includes(t.id))}
          completedCount={momentumBuilder.state.completedCount}
          requiredCount={momentumBuilder.state.requiredCount}
          targetTaskTitle={tasks.find(t => t.id === momentumBuilder.state.targetTaskId)?.title ?? ''}
          onTaskClick={handleWarmupTaskComplete}
          onSkipToTarget={handleSkipWarmup}
          onCancel={handleCancelWarmup}
          theme={theme}
          spicyLevel={spicyLevel as SpicyLevel}
        />
      )}

      {/* Body Doubling FAB - floating action button */}
      {profile?.body_doubling_enabled && !bodyDoubling.state.isActive && (
        <button
          onClick={handleOpenBodyDoublingStart}
          className={`fixed bottom-24 left-4 z-30 p-3 rounded-full shadow-lg transition-all ${
            isHinged
              ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
              : 'bg-mint text-charcoal border-2 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5'
          }`}
          aria-label="Start body doubling session"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}
