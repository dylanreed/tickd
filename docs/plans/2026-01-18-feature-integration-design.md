# Feature Integration Design

## Overview

Wire up existing feature hooks and components into TaskListPage.tsx using progressive disclosure - features appear contextually when relevant.

## Trigger Points

| Feature | Trigger |
|---------|---------|
| Daily Check-in | App load, once per day, before showing task list |
| Time Estimates | When user starts working on a task |
| Estimate Alerts | During task work when elapsed > 1.5x/2x/3x estimate |
| Just 5 Minutes | Button on task card |
| Task Shrinking | "Shrink" button on task card |
| Body Doubling | Session mode from task or global button |
| Momentum Builder | When starting a task flagged as "big" |
| Transition Help | After 30+ min absence OR browsing 3+ times without starting |

## Rendering Priority (top layer wins)

1. Daily Check-in Modal (blocks everything)
2. Single Task Mode (from Pick For Me escalation)
3. Body Doubling Session overlay
4. Transition Help / Startup Ritual flow
5. Normal task list with contextual buttons

## Files to Modify

- `TaskListPage.tsx` - Import hooks, add state, render components
- `TaskCard.tsx` - Add "5 min" and "Shrink" buttons

## Components to Wire In

- DailyCheckinModal
- FiveMinutesButton + FiveMinutesTimer
- ShrinkTaskModal + MicroStepView
- BodyDoublingStart + BodyDoublingSession
- WarmupOffer + WarmupQueue
- TransitionPrompt + RitualWalkthrough + CountdownTimer
- EstimatePrompt + EstimateReveal
- TimeAlertToast

## Hooks to Import

- useDailyCheckin
- useFiveMinutes
- useTaskShrinking
- useBodyDoubling
- useMomentumBuilder
- useTransitionHelp
- useTaskEstimation
- useTimeAlerts
